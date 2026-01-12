import { useState, useEffect } from "react";

type Location = {
  lat: number;
  lng: number;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<Location>({ lat: 23.8859, lng: 45.0792 }); // Default to London
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, error };
};

export default useUserLocation;
