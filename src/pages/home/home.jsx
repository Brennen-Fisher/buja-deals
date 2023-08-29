import React, { useContext, useEffect, useState } from 'react';
import './home.scss';
import { AuthContext } from '../../context/AuthContext';
import { LangContext } from '../../context/LangContext';
import { useNavigate } from 'react-router';
// import { updateDB } from "../../dbsort";
import newRequest from '../../utils/newRequest';
import ListContainer from '../../components/listingContainer/listContainer';
import Slider from "react-slick";

const home = () => {

    const { user } = useContext(AuthContext);
    const { lang } = useContext(LangContext);
    const navigate = useNavigate();
    const [qSort, setSort] = useState("updatedAt");
    const [qLimit, setLimit] = useState(8);
    const [posts, setPosts] = useState();
    const [someValue, setSomeValue] = useState("");
    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    /*
    {
        const quickSort = (arr) => {
            if (arr.length <= 1) {
                return arr;
            }

            let pivot = arr[0];
            let leftArr = [];
            let rightArr = [];

            pivot.total = pivot.rating - (4 * ((pivot.days >= 30 ? 30 : pivot.days) / 30));
            pivot.total = pivot.total < 0 ? 0 : pivot.total;
            if (pivot.days >= 60 && pivot.days <= 120) { pivot.total = -1 }
            else if (pivot.days >= 121) { pivot.total = - 2 }
            // pivot.total = pivot.ads ? 1 + pivot.total : pivot.total;

            for (let i = 1; i < arr.length; i++) {
                arr[i].total = arr[i].rating - (4 * ((arr[i].days >= 30 ? 30 : arr[i].days) / 30));
                arr[i].total = arr[i].total < 0 ? 0 : arr[i].total;
                // arr[i].total = arr[i].ads ? 1 + arr[i].total : arr[i].total;
                if (arr[i].days >= 60 && arr[i].days <= 120) { arr[i].total = -1 }
                else if (arr[i].days >= 121) { arr[i].total = - 2 }
                if (arr[i].total > pivot.total) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
            let final = [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
            return final;
        };

        const accountAds = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].ads)
                    arr[i].rating = arr[i].rating + 1;
            }
            return arr;
        }

        const handleSign = async (e) => {
            e.preventDefault();
            try {
                // const res = await axios.get("http://localhost:8800/api/auth/test");
                const res = await newRequest.post("/auth/login", {
                    email: e.target[0].value,
                    password: e.target[1].value,
                });
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                // navigate("/listings");
            } catch (error) {
                console.log("error");
                console.log(error);
                setError(error.response.data);
            }
        }

        const testObj = [
            {
                name: "Greg",
                rating: 3,
                days: 0,
                ads: false,
                total: 0,
            },
            {
                name: "Fred",
                rating: 4,
                days: 0,
                ads: false,
                total: 0,
            },
            {
                name: "Bobby",
                rating: 3,
                days: 0,
                ads: true,
                total: 0,
            },
            {
                name: "Carly",
                rating: 3,
                days: 30,
                ads: false,
                total: 0,
            },
            {
                name: "Derick",
                rating: 4,
                days: 26,
                ads: true,
                total: 0,
            },
            {
                name: "Edward",
                rating: 3,
                days: 120,
                ads: true,
                total: 0,
            },
        ]
    }
    */
    // const date = new Date();
    // console.log(date);
    // console.log(data);

    // useEffect(() => {
        
    // }, [])

    useEffect(() => {
        const data = newRequest.get(`/list/random?` + "&type=house&sale=sale&size=" + qLimit,).then(async (res, req) => {
            setPosts(res.data.posts);
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
        navigate("/listings" + "/" + e.target[0].value + "&" + e.target[1].value + "&" + e.target[2].value + "&" + e.target[3].value + "&" + e.target[4].value + "&" + e.target[5].value);
    }
    // no gitega
    // no shatanya

    var settings = {
        infinite: true,
        slidesToShow: 4,
        swipeToSlide: true,
        initialSlide: 0,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    swipeToSlide: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    swipeToSlide: true,
                    infinite: true,
                }
            },
        ]
    };

    return (
        <div className='h-full homeContainer bg-[skyblue]'>
            <div className='searchArea flex flex-col justify-center items-center w-full min-h-[475px] bg-[url(https://as1.ftcdn.net/v2/jpg/02/59/49/04/1000_F_259490451_Iet3CQIcQ3J7YG6x20an3mXqYPO6WRZf.jpg)] bg-no-repeat bg-cover p-[50px]'>
                {/* <div className='flex gap-3 bg-[#2b2b2bc4] p-5 rounded'>
                    <div className='flex flex-col items-center text-center'>
                        {/* Text Here
                        {/* <h2 className='text-3xl font-bold text-white underline pb-5'>{lang === "En" ? "Find hundreds of listings" : "Trouvez des centaines de postes"}<br />{lang === "En" ? "for" : "pour"} <br />{lang === "En" ? "Houses and Cars!" : "les maisons et les voitures!!"} </h2> 
                    </div>
                </div> */}
                {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={() => navigate("/listings")} >{lang === "En" ? "Search now!" : "Aller!"}</button> */}
            </div>
            <div className='w-full flex justify-center bg-[whitesmoke]'>
                <div className='z-[1] mt-[-90px]'>
                    <div name="tab" className='flex justify-center gap-1'>
                        <button className={("p-3 rounded-t-md " + (tab1 ? "bg-[skyblue]" : "bg-white"))} name="tablinks" type='button' onClick={() => { setTab1(true); setTab2(false); setTab3(false); }}>Search All</button>
                        <button className={("p-3 rounded-t-md " + (tab2 ? "bg-[skyblue]" : "bg-white"))} name="tablinks" type='button' onClick={() => { setTab1(false); setTab2(true); setTab3(false); }}>Search Houses</button>
                        <button className={("p-3 rounded-t-md " + (tab3 ? "bg-[skyblue]" : "bg-white"))} name="tablinks" type='button' onClick={() => { setTab1(false); setTab2(false); setTab3(true); }}>Search Cars</button>
                    </div>
                    <div className='flex justify-center p-5 px-20 bg-[skyblue] w-full shadow-lg rounded-md'>

                        <div className={("" + (tab1 ? "flex" : "hidden"))}>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col lg:flex-row gap-3'>
                                        <span className='grid grid-cols-2 lg:flex [&>div]:items-center lg:flex-row gap-x-3'>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Sale or Rent?
                                                </label>
                                                <select name="sale" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="sale">For Sale</option>
                                                    <option value="rent">For Rent</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Commune
                                                </label>
                                                <select name="commune" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="muha">Muha</option>
                                                    <option value="mukaza">Mukaza</option>
                                                    <option value="ntahangwa">Ntahangwa</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Zone
                                                </label>
                                                <select name="zone" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="buterere">Buterere</option>
                                                    <option value="buyenzi">Buyenzi</option>
                                                    <option value="bwiza">Bwiza</option>
                                                    <option value="cibitoke">Cibitoke</option>
                                                    <option value="gihosha">Gihosha</option>
                                                    <option value="kamenge">Kamenge</option>
                                                    <option value="kanyosha">Kanyosha</option>
                                                    <option value="kinama">Kinama</option>
                                                    <option value="kinindo">Kinindo</option>
                                                    <option value="musaga">Musaga</option>
                                                    <option value="ngagara">Ngagara</option>
                                                    <option value="rohero">Rohero</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col w-full whitespace-nowrap'>
                                                <label>
                                                    Max Price
                                                </label>
                                                <select name="price" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="5000">5 000</option>
                                                    <option value="10000">10 000</option>
                                                    <option value="50000">50 000</option>
                                                    <option value="100000">100 000</option>
                                                    <option value="200000">200 000</option>
                                                    <option value="300000">300 000</option>
                                                    <option value="500000">500 000</option>
                                                    <option value="1000000">1 000 000</option>
                                                    <option value="1500000">1 500 000</option>
                                                    <option value="2000000">2 000 000</option>
                                                    <option value="2500000">2 500 000</option>
                                                    <option value="5000000">5 000 000</option>
                                                    <option value="10000000">10 000 000</option>
                                                </select>
                                            </div>
                                        </span>
                                        <span className='flex flex-col items-center w-full whitespace-nowrap'>
                                            <label>
                                                Propery Type
                                            </label>
                                            <select name="property" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                <option value="any">Any</option>
                                                <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
                                                <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
                                                <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
                                                <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
                                                <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
                                                <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
                                                <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
                                            </select>
                                        </span>
                                    </div>
                                    <button value={"any"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Search</button>
                                </div>
                            </form>
                        </div>

                        <div className={("" + (tab2 ? "flex" : "hidden"))}>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col lg:flex-row gap-3'>
                                        <span className='grid grid-cols-2 lg:flex [&>div]:items-center lg:flex-row gap-x-3'>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Sale or Rent?
                                                </label>
                                                <select name="sale" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="sale">For Sale</option>
                                                    <option value="rent">For Rent</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Commune
                                                </label>
                                                <select name="commune" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="muha">Muha</option>
                                                    <option value="mukaza">Mukaza</option>
                                                    <option value="ntahangwa">Ntahangwa</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Zone
                                                </label>
                                                <select name="zone" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="buterere">Buterere</option>
                                                    <option value="buyenzi">Buyenzi</option>
                                                    <option value="bwiza">Bwiza</option>
                                                    <option value="cibitoke">Cibitoke</option>
                                                    <option value="gihosha">Gihosha</option>
                                                    <option value="kamenge">Kamenge</option>
                                                    <option value="kanyosha">Kanyosha</option>
                                                    <option value="kinama">Kinama</option>
                                                    <option value="kinindo">Kinindo</option>
                                                    <option value="musaga">Musaga</option>
                                                    <option value="ngagara">Ngagara</option>
                                                    <option value="rohero">Rohero</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col w-full whitespace-nowrap'>
                                                <label>
                                                    Max Price
                                                </label>
                                                <select name="price" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="5000">5 000</option>
                                                    <option value="10000">10 000</option>
                                                    <option value="50000">50 000</option>
                                                    <option value="100000">100 000</option>
                                                    <option value="200000">200 000</option>
                                                    <option value="300000">300 000</option>
                                                    <option value="500000">500 000</option>
                                                    <option value="1000000">1 000 000</option>
                                                    <option value="1500000">1 500 000</option>
                                                    <option value="2000000">2 000 000</option>
                                                    <option value="2500000">2 500 000</option>
                                                    <option value="5000000">5 000 000</option>
                                                    <option value="10000000">10 000 000</option>
                                                </select>
                                            </div>
                                        </span>
                                        <span className='flex flex-col items-center w-full whitespace-nowrap'>
                                            <label>
                                                Propery Type
                                            </label>
                                            <select name="property" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                <option value="any">Any</option>
                                                <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
                                                <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
                                                <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
                                                <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
                                                <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
                                                <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
                                                <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
                                            </select>
                                        </span>
                                    </div>
                                    <button value={"any"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Search</button>
                                </div>
                            </form>
                        </div>

                        <div className={("" + (tab3 ? "flex" : "hidden"))}>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col lg:flex-row gap-3'>
                                        <span className='grid grid-cols-2 lg:flex [&>div]:items-center lg:flex-row gap-x-3'>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Sale or Rent?
                                                </label>
                                                <select name="sale" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="sale">For Sale</option>
                                                    <option value="rent">For Rent</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Commune
                                                </label>
                                                <select name="commune" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="muha">Muha</option>
                                                    <option value="mukaza">Mukaza</option>
                                                    <option value="ntahangwa">Ntahangwa</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col  w-full whitespace-nowrap'>
                                                <label>
                                                    Zone
                                                </label>
                                                <select name="zone" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="buterere">Buterere</option>
                                                    <option value="buyenzi">Buyenzi</option>
                                                    <option value="bwiza">Bwiza</option>
                                                    <option value="cibitoke">Cibitoke</option>
                                                    <option value="gihosha">Gihosha</option>
                                                    <option value="kamenge">Kamenge</option>
                                                    <option value="kanyosha">Kanyosha</option>
                                                    <option value="kinama">Kinama</option>
                                                    <option value="kinindo">Kinindo</option>
                                                    <option value="musaga">Musaga</option>
                                                    <option value="ngagara">Ngagara</option>
                                                    <option value="rohero">Rohero</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col w-full whitespace-nowrap'>
                                                <label>
                                                    Max Price
                                                </label>
                                                <select name="price" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                    <option value="any">Any</option>
                                                    <option value="5000">5 000</option>
                                                    <option value="10000">10 000</option>
                                                    <option value="50000">50 000</option>
                                                    <option value="100000">100 000</option>
                                                    <option value="200000">200 000</option>
                                                    <option value="300000">300 000</option>
                                                    <option value="500000">500 000</option>
                                                    <option value="1000000">1 000 000</option>
                                                    <option value="1500000">1 500 000</option>
                                                    <option value="2000000">2 000 000</option>
                                                    <option value="2500000">2 500 000</option>
                                                    <option value="5000000">5 000 000</option>
                                                    <option value="10000000">10 000 000</option>
                                                </select>
                                            </div>
                                        </span>
                                        <span className='flex flex-col items-center w-full whitespace-nowrap'>
                                            <label>
                                                Propery Type
                                            </label>
                                            <select name="property" className="w-fit p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
                                                <option value="any">Any</option>
                                                <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
                                                <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
                                                <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
                                                <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
                                                <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
                                                <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
                                                <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
                                            </select>
                                        </span>
                                    </div>
                                    <button value={"any"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center bg-[whitesmoke] py-10 '>

                <div className='flex flex-col items-center w-full'>
                    {/* Text Here */}
                    <p className='py-5 font-bold text-2xl'>{lang === "En" ? "Recent Listings:" : "Postes récentes:"}</p>
                    {/* <div className='lg:w-1/2 w-full grid lg:grid-cols-2 grid-cols-1 gap-3 lg:h-1/3 h-full lg:gap-12'> */}
                    <div id='sliderParent' className='w-[90%]'>
                        <Slider {...settings}>
                            {
                                posts ? posts.map(p => (p.what === "house" ? <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} />)) : <div className='loading'>Loading..</div>
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            <div className='bg-[skyblue] text-black max-h-[1000px] py-5'>
                <div className='w-full items-center flex flex-col justify-center bg-whitemoke'>
                    {/* Text Here */}

                    <p className='py-5 font-bold text-2xl'>{lang === "En" ? "We're here to help you:" : "Nous sommes là pour vous aider:"}</p>
                    <div className='w-4/6 grid lg:grid-cols-3 md:grid-cols-1 gap-4'>
                        <div className='bg-[white] min-h-[200px] w-auto flex-col flex justify-center projects_hover wow animated'>
                            <span className='font-bold flex flex-col items-center'>
                                {/* Text Here */}
                                {lang === "En" ? "Make A listing" : "Faire une liste"}
                                <p className='font-normal w-1/2'>
                                    {lang === "En" ? "Zillow Home Loans can get you pre-approved so youre ready to make an offer quickly when you find the right home." : "Les prêts immobiliers Zillow peuvent vous faire pré-approuver afin que vous soyez prêt à faire une offre rapidement lorsque vous trouvez la bonne maison."}
                                </p>
                            </span>
                        </div>
                        <div className='bg-[white] min-h-[200px] w-auto flex-col flex justify-center projects_hover wow animated'>
                            <span className='font-bold flex flex-col items-center'>
                                {/* Text Here */}
                                {lang === "En" ? "Search Listings" : "Recherche d'annonces"}
                                <p className='font-normal w-1/2'>
                                    {lang === "En" ? "No matter what path you take to sell your home, we can help you navigate a successful sale." : "Peu importe le chemin que vous empruntez pour vendre votre maison, nous pouvons vous aider à réussir la vente."}
                                </p>
                            </span>
                        </div>
                        <div className='bg-[white] min-h-[200px] w-auto flex-col flex justify-center projects_hover wow animated'>
                            <span className='font-bold flex flex-col items-center'>
                                {lang === "En" ? "Buy a home today!" : "Achetez une maison aujourd'hui!"}
                                <p className='font-normal w-1/2'>
                                    {lang === "En" ? "Were creating a seamless online experience  from shopping on the largest rental network, to applying, to paying rent." : "Nous créons une expérience en ligne transparente depuis les achats sur le plus grand réseau de location, jusqu'à la candidature et le paiement du loyer."}
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    // else if (lang === "Fr")
    //     return (
    //         <div className='h-full homeContainer'>
    //             <div className='searchArea'>
    //                 <div className='grid grid-cols-3 gap-3'>
    //                     <div></div>
    //                     <div></div>
    //                     <div className='flex flex-col items-start text-start'>
    //                         <h2 className='text-2xl font-bold text-white underline pb-5'>Trouvez des centaines de postes <br /> pour<br /> les maisons et les voitures!!</h2>
    //                         <button className='bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={() => navigate("/listings")} >Aller maintenant!</button>
    //                     </div>
    //                 </div>
    //                 {/* <button onClick={()=>console.log(updateDB())}>Button for testing</button> */}

    //                 {/* {quickSort(accountAds(testObj)).map(o => (
    //                     <div>
    //                         {o.name} {o.rating} {o.total}
    //                     </div>
    //                 ))} */}
    //             </div>
    //             <div className='w-full flex justify-center bg-white py-10'>
    //                 {user ? (<div className='flex flex-col w-4/6'>
    //                     <p className='py-5 font-bold text-2xl'>Postes récentes:</p>
    //                     <div className='w-full grid grid-cols-2 h-1/3 gap-4'>
    //                         {
    //                             posts ? posts.map(p => (p.type === "house" ? <ListContainer city={p.city} style={p.style} sale={p.sale} type={p.type} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} country={p.country} zip={p.zip} /> : <ListContainer id={p._id} city={p.city} sale={p.sale} type={p.type} make={p.make} model={p.model} year={p.year} image={p.image} price={p.price} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} style={p.style} addy={p.addy} country={p.country} zip={p.zip} />)) : <div className='loading'>Loading..</div>
    //                         }
    //                     </div>
    //                 </div>) :
    //                     (<div className='ad'>
    //                         <h2>Créez un compte aujourd'hui!</h2>
    //                         <button >Se connecter</button>
    //                     </div>)}
    //             </div>
    //             <div className='bg-white h-1/3 py-5'>
    //                 <div className='w-full items-center flex flex-col justify-center bg-whitemoke'>
    //                     <p className='py-5 font-bold text-2xl'>Nous sommes là pour vous aider:</p>
    //                     <div className='w-4/6 grid grid-cols-3 gap-4'>
    //                         <div className='bg-white w-auto flex-col grid grid-rows-2 projects_hover wow animated'>
    //                             <div className='image1'></div>
    //                             <span className='font-medium flex flex-col items-center'>
    //                                 Faire une liste
    //                                 <p className='font-normal w-1/2'>
    //                                     Les prêts immobiliers Zillow peuvent vous faire pré-approuver afin que vous soyez prêt à faire une offre rapidement lorsque vous trouvez la bonne maison.
    //                                 </p>
    //                             </span>
    //                         </div>
    //                         <div className='bg-white w-auto flex-col grid grid-rows-2 projects_hover wow animated'>
    //                             <div className='image2'></div>
    //                             <span className='font-bold flex flex-col items-center'>
    //                                 Recherche d'annonces
    //                                 <p className='font-normal w-1/2'>
    //                                     Peu importe le chemin que vous empruntez pour vendre votre maison, nous pouvons vous aider à réussir la vente.
    //                                 </p>
    //                             </span>
    //                         </div>
    //                         <div className='bg-white w-auto flex-col grid grid-rows-2 projects_hover wow animated'>
    //                             <div className='image3'></div>
    //                             <span className='font-medium flex flex-col items-center'>
    //                                 Achetez une maison aujourd'hui!
    //                                 <p className='font-normal w-1/2'>
    //                                     Nous créons une expérience en ligne transparente depuis les achats sur le plus grand réseau de location, jusqu'à la candidature et le paiement du loyer.
    //                                 </p>
    //                             </span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
}

export default home