import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface UseInactivityLogoutOptions {
  /**
   * Timeout in milliseconds (default: 29 minutes)
   */
  timeout?: number;
  /**
   * Enable/disable inactivity logout
   */
  enabled?: boolean;
  /**
   * Custom logout callback
   */
  onLogout?: () => void;
}

const DEFAULT_TIMEOUT = 30 * 60 * 1000; // 2 minutes (change to 29 * 60 * 1000 for production)

/**
 * Hook to automatically logout user after inactivity period
 * Tracks user activity (mouse, keyboard, touch, scroll) and resets timer
 */
export const useInactivityLogout = (options: UseInactivityLogoutOptions = {}) => {
  const {
    timeout = DEFAULT_TIMEOUT,
    enabled = true,
    onLogout,
  } = options;

  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = () => {
    // Clear tokens and cookies
    Cookies.remove("access_token");
    Cookies.remove("userState");
    
    // Call custom logout callback if provided
    if (onLogout) {
      onLogout();
    }
    
    // Redirect to home page
    navigate("/");
  };

  const resetTimer = () => {
    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (!enabled) return;

    // Set logout timer
    timeoutRef.current = setTimeout(() => {
      logout();
    }, timeout);
  };

  useEffect(() => {
    if (!enabled) return;

    // Events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners to reset timer on activity
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, timeout]);

  return {
    resetTimer,
    logout,
  };
};

