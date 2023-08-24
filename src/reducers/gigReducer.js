export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("user"))?._id,
    image: [""],
    price: 0,
    year: 0,
    sale: "",
    bath: 0,
    room: 0,
    m2: 0,
    make: "",
    model: "",
    mileage: 0,
    mpg: 0,
    color: "",
    engine: "",
    style: "",
    desc: "",
    feat: "",
    fact: "",
    city: "",
    country: "",
    addy: "",
    type: "",
  };
  
  export const gigReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES":
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
        };
      case "ADD_FEATURE":
        return {
          ...state,
          features: [...state.features, action.payload],
        };
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state.features.filter(
            (feature) => feature !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };