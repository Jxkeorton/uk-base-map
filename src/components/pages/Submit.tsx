import { useState, ChangeEvent, FormEvent } from 'react';
import {toast} from 'react-toastify'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PacmanLoader } from 'react-spinners';


const Submit = () => {
    const [formData, setFormData] = useState({
        exitName: '',
        rockdrop: '',
        total: '',
        anchor: '',
        access: '',
        notes:'',
        coordinates:'',
        cliffAspect:'',
        openedby:'',
        dateOpened:'',
        email:'',
        video:'',
      });
    const [imageFiles, setImageFiles] = useState<File[]>([]); 
    const [isLoading, setIsLoading] = useState(false);

    const storage = getStorage();

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
    }));
};

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImageFiles(selectedFiles);
      toast.success("File added")
    }
  };
  
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload the image files to Firebase Storage
      const imageURLs: string[] = [];
      for (const file of imageFiles) {
        const storageRef = ref(storage, `submissions/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageURL = await getDownloadURL(storageRef);
        imageURLs.push(imageURL);
      }

      // Save the form data and image URLs to Firestore
      const submissionData = {
        ...formData,
        imageURLs, // Add the image URLs to the form data
      };

      const docRef = await addDoc(collection(db, 'submits'), submissionData);
      console.log('Document written with ID: ', docRef.id);

      // Display success message or perform any necessary actions
      toast.success('Form submitted successfully!');
      setFormData({
        exitName: '',
        rockdrop: '',
        total: '',
        anchor: '',
        access: '',
        notes: '',
        coordinates: '',
        cliffAspect: '',
        openedby: '',
        dateOpened: '',
        email: '',
        video: '',
      });
      setImageFiles([]);
    } catch (error) {
      toast.error('Error adding document');
      console.log('error with form submit: ', error);
    } finally {
        setIsLoading(false); // Hide loader
    }
  };



  return (
    <div className="submit-form-container">
      <h1>Submit A New Exit</h1>
      <form onSubmit={handleSubmit}>
        <div className="submit-form-group">
          <label htmlFor="exitName">Exit Name * :</label>
          <input
            type="text"
            id="exitName"
            name="exitName"
            value={formData.exitName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="rockdrop">Rock drop in feet * :</label>
          <input
            type='number'
            id="rockdrop"
            name="rockdrop"
            value={formData.rockdrop}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="submit-form-group">
          <label htmlFor="total">Overall height in feet:</label>
          <input
            type="number"
            id="total"
            name="total"
            value={formData.total}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="anchor">Anchor info:</label>
        <input
            type='text'
            id="anchor"
            name="anchor"
            value={formData.anchor}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="access">Access:</label>
          <textarea
            id="access"
            name="access"
            value={formData.access}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="coordinates">Precise GPS coordinates * :</label>
          <input
            type="text"
            id="coordinates"
            name="coordinates"
            value={formData.coordinates}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="cliffAspect">Cliff Aspect:</label>
          <input
            type="text"
            id="cliffAspect"
            name="cliffAspect"
            value={formData.cliffAspect}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="video">Video link:</label>
          <input
            type="text"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="openedby">Opened by:</label>
          <input
            type="text"
            id="openedby"
            name="openedby"
            value={formData.openedby}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="dateOpened">Opened date:</label>
          <input
            type="text"
            id="dateOpened"
            name="dateOpened"
            value={formData.dateOpened}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="email">Your email in case more info needed:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-form-group">
          <label htmlFor="image" className='image-input-label'>Upload Images</label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            onChange={handleFileChange}
            className='image-input'
            multiple
             />
        </div>
        <div className="submit-form-group">
          <button type="submit">{isLoading ? <PacmanLoader /> : 'Submit'}</button>
        </div>
      </form>
    </div>
  );
};

export default Submit
