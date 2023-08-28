import React, { useContext, useEffect, useState } from 'react';
import './listings.scss';
import ListContainer from './../../components/listingContainer/listContainer';
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router';
import { LangContext } from '../../context/LangContext';


function Listings() {

    const { id } = useParams();
    const [posts, setPosts] = useState();
    const [qType, setType] = useState("updatedAt");
    const [qOrder, setOrder] = useState(-1);
    const [qWhat, setWhat] = useState();
    const [qSale, setSale] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [last, setLast] = useState(false);
    const [qCom, setCom] = useState();
    const [qZone, setZone] = useState();
    const [qStyle, setStyle] = useState();
    const [qPrice, setPrice] = useState();

    const [first, setFirst] = useState(0);
    const { lang } = useContext(LangContext);

    const params = id?.split("&");
    // console.log(params);
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["lists"],
        queryFn: () =>
            newRequest.get(`/list/posts?` + (qCom ? "&com=" + qCom : "") + (qZone ? "&zone=" + qZone : "") + (qStyle ? "&style=" + qStyle : "") + (qPrice ? "&price=" + qPrice : "") + (qWhat ? "&what=" + qWhat : "") + (qSale ? "&sale=" + qSale : "") + (qType ? "&sort=" + qType : "") + (qOrder ? "&order=" + qOrder : "") + "&page=" + page + "&limit=" + limit).then(async (res, req) => {
                // console.log(`/list/posts?` + "what=" + qWhat + "&sale=" + qSale + "&sort=" + qType + "&order=" + qOrder + "&page=" + page + "&limit=" + limit);
                return res.data;
            }),
    });

    /* Old Code
    const sortListing = async () => {

        let array = [];
        const q = query(collection(db, "posts"), where('type', '==', qWhat), where('sale', '==', qSale), orderBy(qType, qOrder), limit(12));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            array.push(doc.data());
        });
        setLast(false);
        setFirst(0);
        try {
            if ("key" in array[11]) {
                // console.log("key" in array[4] ? "true" : "false");
                // console.log("pop");
                array.pop();
            }
        } catch (error) {
            console.log("empty");
            setLast(true);
        }
        // array = querySnapshot.docs;
        setFDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setPosts(array);
    }

    const paginateF = async () => {
        if (!last) {
            setPosts([]);
            let array = [];
            const q = query(collection(db, "posts"), where('type', '==', qWhat), where('sale', '==', qSale), orderBy(qType, qOrder), startAt(fDoc), limit(12));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                array.push(doc.data());
            });
            try {
                if ("key" in array[4]) {
                    // console.log("key" in array[4] ? "true" : "false");
                    // console.log("pop");
                    array.pop();

                }
            } catch (error) {
                console.log("empty");
                setLast(true);
            }
            setFirst(first + 1);
            setBDoc(querySnapshot.docs[0]);
            setFDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setPosts(array);
        }
    }

    const paginateB = async () => {
        if (first !== 0) {
            setPosts([]);
            let array = [];
            const q = query(collection(db, "posts"), where('type', '==', qWhat), where('sale', '==', qSale), orderBy(qType, qOrder), endAt(bDoc), limitToLast(12));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                array.push(doc.data());
            });
            try {
                if ("key" in array[11]) {
                    // console.log("key" in array[4] ? "true" : "false");
                    // console.log("pop");
                    array.pop();
                    setFirst(first - 1);
                }
            } catch (error) {
                console.log("empty");
            }

            setLast(false);
            setBDoc(querySnapshot.docs[0]);
            setFDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setPosts(array);
        }
    }*/
    const changeOrder = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == "recent") {
            setType("updatedAt");
            setOrder(-1);
            // console.log("first");
        } else if (e.target.value == "high") {
            setType("price");
            setOrder(-1);
            // console.log("second");
        } else if (e.target.value == "low") {
            setType("price");
            setOrder(1);
            // console.log("third");
        }
    }

    const changeWhat = async (e) => {
        // console.log(e.target.value);
        if (e.target.value === "any") {
            setWhat();
        } else if (e.target.value == "house") {
            setWhat("house");
        } else if (e.target.value == "car") {
            setWhat("car");
            if(qStyle !== null)
                setStyle();
        }
    }

    const changeSale = async (e) => {
        // console.log(e.target.value);
        if (e.target.value === "any") {
            setSale();
        } else if (e.target.value == "sale") {
            setSale("sale");
        } else if (e.target.value == "rent") {
            setSale("rent");
        }
    }

    const changeZone = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == "any") {
            setZone();
        } else if (e.target.value == "buterere") {
            setZone("buterere");
        } else if (e.target.value == "buyenzi") {
            setZone("buyenzi");
        } else if (e.target.value == "bwiza") {
            setZone("bwiza");
        } else if (e.target.value == "cibitoke") {
            setZone("cibitoke");
        } else if (e.target.value == "gihosha") {
            setZone("gihosha");
        } else if (e.target.value == "kamenge") {
            setZone("kamenge");
        } else if (e.target.value == "kanyosha") {
            setZone("kanyosha");
        } else if (e.target.value == "kinama") {
            setZone("kinama");
        } else if (e.target.value == "kinindo") {
            setZone("kinindo");
        } else if (e.target.value == "musaga") {
            setZone("musaga");
        } else if (e.target.value == "ngagara") {
            setZone("ngagara");
        } else if (e.target.value == "rohero") {
            setZone("rohero");
        }
    }

    const changeComm = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == "any") {
            setCom();
        } else if (e.target.value == "muha") {
            setCom("muha");
        } else if (e.target.value == "mukaza") {
            setCom("mukaza");
        } else if (e.target.value == "ntahangwa") {
            setCom("ntahangwa");
        }
    }

    const changePrice = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == "any") {
            setPrice();
        } else if (e.target.value == "5000") {
            setPrice("5000");
        } else if (e.target.value == "10000") {
            setPrice("10000");
        } else if (e.target.value == "50000") {
            setPrice("50000");
        } else if (e.target.value == "100000") {
            setPrice("100000");
        } else if (e.target.value == "200000") {
            setPrice("200000");
        } else if (e.target.value == "300000") {
            setPrice("300000");
        } else if (e.target.value == "500000") {
            setPrice("500000");
        } else if (e.target.value == "1000000") {
            setPrice("1000000");
        } else if (e.target.value == "1500000") {
            setPrice("1500000");
        } else if (e.target.value == "2000000") {
            setPrice("2000000");
        } else if (e.target.value == "2500000") {
            setPrice("2500000");
        } else if (e.target.value == "5000000") {
            setPrice("5000000");
        } else if (e.target.value == "10000000") {
            setPrice("10000000");
        }
    }

    const changeStyle = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == "any") {
            setStyle();
        } else if (e.target.value == "condo") {
            setStyle("condo");
        } else if (e.target.value == "single") {
            setStyle("single");
        } else if (e.target.value == "townhouse") {
            setStyle("townhouse");
        } else if (e.target.value == "coop") {
            setStyle("coop");
        } else if (e.target.value == "apartment") {
            setStyle("apartment");
        } else if (e.target.value == "multi") {
            setStyle("multi");
        } else if (e.target.value == "lot") {
            setStyle("lot");
        }
    }

    useEffect(() => {
        if (params) {
            params[0] !== "any" ? setSale(params[0]) : setSale();
            params[1] !== "any" ? setCom(params[1]) : setCom();
            params[2] !== "any" ? setZone(params[2]) : setZone();
            params[3] !== "any" ? setStyle(params[3]) : setStyle();
            params[4] !== "any" ? setPrice(params[4]) : setPrice();
            params[5] !== "any" ? setWhat(params[5]) : setWhat();
            refetch();
        }
    }, []);

    useEffect(() => {
        setPage(1);
        refetch();
    }, [qSale, qWhat, qType, qOrder, qZone, qPrice, qStyle, qCom]);

    useEffect(() => {
        refetch();
    }, [page]);
    // console.log(data);
    if (data)
        return (
            <div className='overflow-x-hidden flex justify-center w-full bg-[skyblue] min-h-[858px]'>
                <div>
                    <div className='flex flex-col justify-start'>
                        <div className='sideBar items-center flex flex-col py-[20px] mr-4 min-[1800px]:items-start'>
                            <form className='gap-1 lg:flex grid grid-cols-2 lg:flex-row' method='post' id='qForm'>
                                <div>
                                    <select onInput={changeSale} name="howBuy" id="how">
                                        {/** Text Here */}
                                        <option value="any">Any</option>
                                        <option value="sale">{lang === "En" ? "Buy" : "Acheter"}</option>
                                        <option value="rent">{lang === "En" ? "Rent" : "Louer"}</option>
                                    </select>
                                    <label htmlFor="how">{lang === "En" ? "Buy/Rent" : "Acheter/Louer"}</label>
                                </div>
                                <div>
                                    <select onInput={changeWhat} name="sortWhat" id="house">
                                        {/** Text Here */}
                                        <option value="any">Any</option>
                                        <option value="house">{lang === "En" ? "House" : "Maison"}</option>
                                        <option value="car">{lang === "En" ? "Car" : "Voiture"}</option>
                                    </select>
                                    <label htmlFor="house">{lang === "En" ? "Cars/Houses" : "Voiture/Maison"}</label>
                                </div>
                                {
                                    qWhat==="house"?(
                                    <div>
                                        <select onInput={changeStyle} id="prop" name="property">
                                            <option value="any">Any</option>
                                            <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
                                            <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
                                            <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
                                            <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
                                            <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
                                            <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
                                            <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
                                        </select>
                                        <label htmlFor="prop">Propery Type</label>
                                    </div>):null
                                }
                                <div>
                                    <select onInput={changeZone} name="zone">
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
                                    <label>
                                        Zone
                                    </label>
                                </div>
                                <div>
                                    <select onInput={changeComm} name="commune">
                                        <option value="any">Any</option>
                                        <option value="muha">Muha</option>
                                        <option value="mukaza">Mukaza</option>
                                        <option value="ntahangwa">Ntahangwa</option>
                                    </select>
                                    <label>
                                        Commune
                                    </label>
                                </div>
                                <div>
                                    <select onInput={changePrice} name="price">
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
                                    <label>
                                        Max Price
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div>
                            <div className='[&>*]:flex [&>*]:relative' id='title'>
                                {/** Text Here */}
                                <h2 className=''>{lang === "En" ? "Listings" : "Des postes"}</h2>
                                <h2>{data.count} {lang === "En" ? "total posts" : "nombre total de poste"}</h2>

                                <div className='flex-row items-center mr-[10px] pb-[50px]'>
                                    <form id="sortDropDown" action="post">
                                        <div>
                                            <select onInput={changeOrder} name="sortBy" id="sort">
                                                {/** Text Here */}
                                                <option value="recent">{lang === "En" ? "Recent" : "récent"}</option>
                                                <option value="low">{lang === "En" ? "Lowest Price" : "Prix le plus bas"}</option>
                                                <option value="high">{lang === "En" ? "Highest Price" : "Le prix le plus élevé"}</option>
                                            </select>
                                            <label htmlFor="sort">{lang === "En" ? "Sort By" : "Trier par"}</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='pb-5 min-[1800px]:min-w-[1875px] items-start flex flex-col w-full'>
                                <div className='grid grid-cols-1 lg:grid-cols-3 min-[1800px]:grid-cols-5 h-auto gap-2'>
                                    {data.posts ? data.posts.map((p) => (p.what === "house" ? <ListContainer verified={p.verified} hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} verified={p.verified} />)) : <div className='loading'>Loading..</div>}
                                </div>
                                {/** Text Here */}
                                {data.posts.length === 0 ? <h1 className='text-2xl min-h-[400px] pt-5 font-bold'>{lang === "En" ? "No Listings Available" : "Aucune poste disponible"}</h1> : null}
                            </div>
                            <div>
                                {/** Text Here */}
                                {page - 1 > 0 && page - 1 * limit <= data.count ? <button className='bg-blue-500 hover:underline text-white font-medium py-2 px-4 rounded' type="button" onClick={() => setPage(page - 1)}>{lang === "En" ? "Prev" : "Précédente"}</button> : <button className='cursor-not-allowed bg-zinc-400 text-white font-medium py-2 px-4 rounded'>{lang === "En" ? "Prev" : "Précédente"}</button>}
                                <div className='inline-flex gap-3 items-center p-3'>
                                    {page - 3 > 0 && (page - 3) * limit <= data.count ? <p>...</p> : null}
                                    {page - 2 > 0 && page - 2 * limit <= data.count ? <a onClick={() => setPage(page - 2)}>{page - 2}</a> : null}
                                    {page - 1 > 0 && page - 1 * limit <= data.count ? <a onClick={() => setPage(page - 1)}>{page - 1}</a> : null}
                                    <p className='inline underline'>{page}</p>
                                    {page * limit < data.count ? <a onClick={() => setPage(page + 1)}>{page + 1}</a> : null}
                                    {(page + 1) * limit < data.count ? <a onClick={() => setPage(page + 2)}>{page + 2}</a> : null}
                                    {(page + 2) * limit < data.count ? <p>...</p> : null}
                                </div>
                                {page * limit < data.count ? <button className='bg-blue-500 hover:underline text-white font-medium py-2 px-4 rounded' type="button" onClick={() => setPage(page + 1)}>{lang === "En" ? "Next" : "Suivante"}</button> : <button className='cursor-not-allowed bg-zinc-400 text-white font-medium py-2 px-4 rounded'>{lang === "En" ? "Next" : "Suivante"}</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
}

export default Listings