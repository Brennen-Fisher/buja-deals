import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import './edit.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import newRequest from '../../utils/newRequest';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQuery } from "@tanstack/react-query";

function Edit() {

    function SubmissionForm() {

        const { isLoading, error, data } = useQuery({
            queryKey: ["list2"],
            queryFn: () =>
                newRequest.get(`/list/` + id).then((res) => {
                    console.log("object");
                    return res.data;
                }),
        });
        console.log(data);

        const mutation = useMutation({
            mutationFn: (list) => {
                return newRequest.put("/list/" + { id }, list);
            },
            onSuccess: () => {
                navigate("/listings");
            },
        });

        const { user } = useContext(AuthContext);
        const { id } = useParams();
        const navigate = useNavigate();
        let imageUrl = [];
        // progress
        const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
        const [price, setPrice] = useState(data?.price);
        const [year, setYear] = useState(data?.year);
        const [sale, setSale] = useState(data?.sale);
        const [bath, setBath] = useState(data?.bath);
        const [room, setRoom] = useState(data?.room);
        const [m2, setM2] = useState(data?.m2);
        const [style, setStyle] = useState(data?.style);
        const [desc, setDesc] = useState(data?.desc);
        const [feat, setFeat] = useState(data?.feat);
        const [fact, setFact] = useState(data?.fact);
        const [city, setCity] = useState(data?.city);
        const [country, setCountry] = useState(data?.country);
        const [addy, setAddy] = useState(data?.addy);
        // const [price, setPrice] = useState();
        // const [price, setPrice] = useState();        

        // Handle file upload event and update state
        // function handleChange(event) {                
        //     console.log(event.target.files[0]);
        //     setFile(event.target.files[0]);
        //     console.log(file);
        // }

        const handleChange = (e) => {
            dispatch({
                type: "CHANGE_INPUT",
                payload: { name: e.name, value: e.value },
            });
        }

        const handleUpdate = (e) => {
            e.preventDefault();
            this.setState({ target: e.target.value });
        };

        useEffect(() => {
            // console.log(state);
            if (state.price !== 0) {
                mutation.mutate(state);
            }
        }, [state]);

        const handleHouseUpload = async (e) => {
            e.preventDefault();
            let tempFile = e.target[10].files;
            console.log(e);
            if (!tempFile) {

                alert("Please upload an image first!");
            }
            for (let indexFile of tempFile) {
                const storageRef = ref(storage, `/files/${indexFile.name}`);

                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                const uploadTask = uploadBytesResumable(storageRef, indexFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url);
                            imageUrl.push(url);
                            if (imageUrl.length === tempFile.length)
                                handleHouseSubmission(e);
                        });
                    }
                );
            }
        };

        const handleHouseSubmission = async (e) => {
            e.preventDefault();

            handleChange(e.target[0]);
            handleChange(e.target[1]);
            handleChange(e.target[2]);
            handleChange(e.target[3]);
            handleChange(e.target[4]);
            handleChange(e.target[5]);
            handleChange(e.target[6]);
            handleChange(e.target[7]);
            handleChange(e.target[8]);
            handleChange(e.target[9]);
            handleChange(e.target[11]);
            handleChange(e.target[12]);
            handleChange(e.target[13]);
            // handleChange(e.target[14]);
            // handleChange(e.target[15]);
            handleChange({ name: "type", value: "house" });
            handleChange({ name: "image", value: imageUrl });
            handleChange({ name: "userId", value: user._id });

            // mutation.mutate(state);
            // submit();
            // const image = imageUrl;
            {
                /*const price = parseFloat(e.target[0].value);
                const style = e.target[1].value;
                const year = e.target[2].value;
                const sale = e.target[3].value;
                const bath = e.target[4].value;
                const room = e.target[5].value;
                const sqft = e.target[6].value;
                const lot = e.target[7].value;
                const addy = e.target[8].value;
                const city = e.target[9].value;
                const state = e.target[10].value;
                const zip = e.target[11].value;
                const description = e.target[13].value;
                const feat = e.target[14].value;
            const fact = e.target[15].value;
            
            try {
                //Create user

                try {

                    //create post on firestore
                    const string = uuid();
                    const personalKey = string.replace(/-/g, "")
                    const res = await newRequest.post("/list/createPost", {
                        type: "house",
                        key: personalKey,
                        uid: user.uid,
                        // image,
                        price,
                        sale,
                        style,
                        year,
                        bath,
                        room,
                        sqft,
                        lot,
                        addy,
                        city,
                        state,
                        zip,
                        description,
                        feat,
                        fact,
                    });

                    //create empty user chats on firestore
                    for (let field of e.target) {
                        field.value = "";
                    }
                    navigate("/listings");
                } catch (err) {
                    console.log(err);

                }
            } catch (err) {

            }*/
            }
        }

        const handleCarUpload = async (e) => {
            e.preventDefault();
            let tempFile = e.target[15].files;
            console.log(tempFile);
            if (!tempFile) {
                alert("Please upload an image first!");
            }
            for (let indexFile of tempFile) {
                const storageRef = ref(storage, `/files/${indexFile.name}`);

                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                const uploadTask = uploadBytesResumable(storageRef, indexFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url);
                            imageUrl.push(url);
                            if (imageUrl.length === tempFile.length)
                                handleCarSubmission(e);
                        });
                    }
                );
            }
        };

        const handleCarSubmission = async (e) => {

            handleChange(e.target[0]);
            handleChange(e.target[1]);
            handleChange(e.target[2]);
            handleChange(e.target[3]);
            handleChange(e.target[4]);
            handleChange(e.target[5]);
            handleChange(e.target[6]);
            handleChange(e.target[7]);
            handleChange(e.target[8]);
            handleChange(e.target[9]);
            handleChange(e.target[10]);
            handleChange(e.target[11]);
            handleChange(e.target[12]);
            handleChange(e.target[13]);
            handleChange(e.target[14]);
            handleChange(e.target[16]);
            handleChange(e.target[17]);
            handleChange(e.target[18]);
            handleChange({ name: "type", value: "car" });
            handleChange({ name: "image", value: imageUrl });
            handleChange({ name: "userId", value: user._id });

            // await handleUpload(e);
            /*const image = imageUrl;
            const price = parseFloat(e.target[0].value);
            const year = e.target[1].value;
            const make = e.target[2].value;
            const model = e.target[3].value;
            const mileage = e.target[4].value;
            const mpg = e.target[5].value;
            const color = e.target[6].value;
            const sale = e.target[7].value;
            const engine = e.target[8].value;
            const regi = e.target[9].value;
            const style = e.target[10].value;
            const addy = e.target[11].value;
            const city = e.target[12].value;
            const state = e.target[13].value;
            const zip = e.target[14].value;
            const description = e.target[16].value;
            const feat = e.target[17].value;
            const fact = e.target[18].value;
            try {
                //Create user

                try {

                    //create post on firestore
                    const string = uuid();
                    const personalKey = string.replace(/-/g, "")
                    await setDoc(doc(db, "posts", personalKey), {
                        type: "car",
                        key: personalKey,
                        uid: user.uid,
                        make,
                        model,
                        mileage,
                        mpg,
                        color,
                        engine,
                        regi,
                        sale,
                        image,
                        price,
                        style,
                        year,
                        addy,
                        city,
                        state,
                        zip,
                        description,
                        feat,
                        fact,
                        date: Timestamp.now(),
                    });

                    //create empty user chats on firestore
                    for (let field of e.target) {
                        field.value = "";
                    }
                    navigate("/listings");
                } catch (err) {
                    console.log(err);

                }
            } catch (err) {

            }*/
        }

        

        function HouseForm() {
            return (
                <div>
                    <form id="subForm" onSubmit={handleHouseUpload}>
                        <h1>Add a new home</h1>
                        <div id='basic' className='formContainer'>
                            <h2>Basic Info</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Price:
                                    <input name='price' type="text" value={data.price} required onBlur={(e) => e.target.value = e.target.value} />
                                </label>
                                <label>
                                    Enter Style:
                                    <select name="style" id="style" value={style} onChange={(e) => setStyle(e.target.value)}>
                                        <option value="blank"> </option>
                                        <option value="condo">Condo</option>
                                        <option value="single">Single Family Home</option>
                                        <option value="townhouse">Townhouse</option>
                                        <option value="coop">Coop</option>
                                        <option value="unknown">Unknown</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="multi">Multi Family</option>
                                        <option value="lot">Lot</option>
                                    </select>
                                </label>
                                <label>
                                    Enter Year of Contruction:
                                    <input name='year' type="text" maxlength="4" required value={year} onChange={(e) => setYear(e.target.value)} />
                                </label>
                                <label>
                                    Is this for rent or sale?
                                    <select name="sale" id="type" value={sale} onChange={(e) => setSale(e.target.value)}>
                                        <option value="blank"> </option>
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div id='size' className='formContainer'>
                            <h2>Enter Size</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Number of Baths:
                                    <input name='bath' type="text" required value={bath} onChange={(e) => setBath(e.target.value)} />
                                </label>
                                <label>
                                    Enter Number of rooms:
                                    <input name='room' type="text" required value={room} onChange={(e) => setRoom(e.target.value)} />
                                </label>
                                <label>
                                    Enter Meters Squared:
                                    <input name='m2' type="text" required value={m2} onChange={(e) => setM2(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div id='location' className='formContainer'>
                            <h2>Enter Location</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Address:
                                    <textarea name='addy' className="inputArea" required value={addy} onChange={(e) => setAddy(e.target.value)}></textarea>
                                </label>
                                <label>
                                    Enter City:
                                    <input name='city' type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
                                </label>
                                <label>
                                    Enter Country:
                                    <input name='country' type="text" required value={country} onChange={(e) => setCountry(e.target.value)} />
                                </label>
                                {/* <label>
                                    Enter Zip code:
                                    <input name='zip' type="text" required value={data.zip}/>
                                </label> */}
                            </div>
                        </div>
                        <div id='media' className='formContainer'>
                            <h2>Enter Media</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Image:
                                    <input name='image' type="file" multiple required accept=".jpg, .png" />
                                </label>
                            </div>
                        </div>
                        <div id='additional' className='formContainer'>
                            <h2>Additional Information</h2>
                            <div className='inputContainer'>
                                {/* <label>
                                    Car or House?
                                    <select name="whatBuy" id="what">
                                        <option value="house">House</option>
                                        <option value="car">Car</option>
                                    </select>
                                </label>
                                <label>
                                    Buy or Rent?
                                    <select name="howBuy" id="how">
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </label> */}
                                <label>
                                    Enter Description:
                                    <textarea name='desc' className="inputArea" placeholder='Give a short Description' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                </label>
                                <label>
                                    Enter Features:
                                    <textarea name='feat' className="inputArea" placeholder='Airconditioned | Parking | 3 Stories' value={feat} onChange={(e) => setFeat(e.target.value)}></textarea>
                                </label>
                                <label>
                                    Enter Facts:
                                    <textarea name='fact' className="inputArea" placeholder='Optional' value={fact} onChange={(e) => setFact(e.target.value)}></textarea>
                                </label>
                            </div>
                        </div>
                        <button id='formButton' type='submit'>submit</button>
                    </form>
                </div>
            );
        }

        function CarForm() {
            return (
                <div>
                    <form id="subForm" onSubmit={handleCarUpload}>
                        <h1>Add a new Car</h1>
                        <div id='basic' className='formContainer'>
                            <h2>Basic Info</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Price:
                                    <input name='price' type="text" required />
                                </label>
                                <label>
                                    Enter Year:
                                    <input name='year' type="text" maxlength="4" required />
                                </label>
                                <label>
                                    Enter Make:
                                    <input name='make' type="text" required />
                                </label>
                                <label>
                                    Enter Model:
                                    <input name='model' type="text" required />
                                </label>
                                <label>
                                    Enter Total Mileage:
                                    <input name='mileage' type="text" required />
                                </label>
                                <label>
                                    Enter Miles per Gallon:
                                    <input name='mpg' type="text" required />
                                </label>
                                <label>
                                    Enter Color:
                                    <input name='color' type="text" />
                                </label>
                                <label>
                                    Is this for rent or sale?
                                    <select name="sale" id="type">
                                        <option value="blank"> </option>
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div id='size' className='formContainer'>
                            <h2>Enter Size</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Engine Size:
                                    <input name='engine' type="text" required />
                                </label>
                                <label>
                                    Year of Registration:
                                    <input name='year' type="text" required />
                                </label>
                                <select name="style" id="style">
                                    <option value="blank"> </option>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>
                        </div>
                        <div id='location' className='formContainer'>
                            <h2>Enter Location</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Address:
                                    <textarea name='addy' className="inputArea" required></textarea>
                                </label>
                                <label>
                                    Enter City:
                                    <input name='city' type="text" required />
                                </label>
                                <label>
                                    Enter Country:
                                    <input name='country' type="text" required />
                                </label>
                                <label>
                                    Enter Zip code:
                                    <input name='zip' type="text" required />
                                </label>
                            </div>
                        </div>
                        <div id='media' className='formContainer'>
                            <h2>Enter Media</h2>
                            <div className='inputContainer'>
                                <label>
                                    Enter Image:
                                    <input type="file" multiple required accept=".jpg, .png" />
                                </label>
                            </div>
                        </div>
                        <div id='additional' className='formContainer'>
                            <h2>Additional Information</h2>
                            <div className='inputContainer'>
                                {/* <label>
                                    Car or House?
                                    <select name="whatBuy" id="what">
                                        <option value="house">House</option>
                                        <option value="car">Car</option>
                                    </select>
                                </label>
                                <label>
                                    Buy or Rent?
                                    <select name="howBuy" id="how">
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </label> */}
                                <label>
                                    Enter Description:
                                    <textarea name='desc' className="inputArea" placeholder='Give a short Description'></textarea>
                                </label>
                                <label>
                                    Enter Features:
                                    <textarea name='feat' className="inputArea" placeholder='Airconditioned | Parking | 3 Stories'></textarea>
                                </label>
                                <label>
                                    Enter Facts:
                                    <textarea name='fact' className="inputArea" placeholder='Optional'></textarea>
                                </label>
                            </div>
                        </div>
                        <button id='formButton' type='submit'>submit</button>
                    </form>
                </div>
            );
        }

        return (
            <div id='formInitial'>
                {/* {what === "" ?
                    (<select name="formSelect" id="formSelect" onChange={(e) => setwhat(e.target.value)}>
                        <option value="blank"> </option>
                        <option value="car">Car</option>
                        <option value="house">House</option>
                    </select>) : null} */}
                {data?.type === "car" ? <CarForm /> : null}
                {data?.type === "house" ? <HouseForm /> : null}
            </div>
        );
    }


    return (
        <SubmissionForm />
    );
}

export default Edit;
