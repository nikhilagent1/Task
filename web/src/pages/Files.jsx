import React, { useState } from 'react';
import axios from 'axios';

const Files = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            console.error("No files selected");
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setFiles(response.data.files)
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <>
            <h1>File Uploading Project</h1>
            <input type="file" name="file" id="file" accept="application/pdf,image/*" multiple onChange={handleFileChange} />
            <button type="submit" className='bg-red-500 w-24 h-12 rounded-lg' onClick={handleOnSubmit}>Upload</button>
        </>
    );
};

export default Files;

