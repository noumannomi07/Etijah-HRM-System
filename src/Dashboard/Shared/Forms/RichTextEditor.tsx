import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useField } from 'formik';

interface RichTextEditorProps {
    label: string;
    name: string;
    isShowLabel?: boolean;
    rows?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    label,
    name,
    isShowLabel = true,
    rows = 10
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <div className="form-group">
            {isShowLabel && (
                <label htmlFor={name} className="label-form">
                    {label}
                </label>
            )}
            <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(content) => setValue(content)}
                modules={modules}
                formats={formats}
                // className="rich-text-editor"
                placeholder="اكتب المحتوى هنا"
 

            />
            {meta.touched && meta.error && (
                <div className="error-message text-danger">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

export default RichTextEditor; 