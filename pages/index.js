import React from 'react';

export default function Upload() {
  const [fileToUpload, setFileToUpload] = React.useState();
  const [publicId, setPublicId] = React.useState('');
  const [image, setImage] = React.useState();

  async function onSubmit() {
    let formData = new FormData();

    formData.append('image', fileToUpload);
    // formData.append('folder', 'converted-images');
    formData.append('public_id', publicId);

    const result = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-key': 'application/json' },
    }).then((res) => res.json());

    console.log(result);

    {/* remove the quotes from the html element and display it */}
    setImage(result.convertedImage);
  }

  return (
    <div>
      <h2>Image Upload</h2>
      <input onChange={(e) => setPublicId(e.target.value)}></input>
      <input
        onChange={(e) => setFileToUpload(e.target.files[0])}
        type='file'
      ></input>
      <br/>
      <button onClick={onSubmit}>Upload</button>
      <br/>
      {image}
      
    </div>
  );
}
