import React, { FormEvent } from "react";
import "./style.css";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../database/firebaseConfig";
import UploadImage from "../../../../database/UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddProducttDataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  displayImages: string;
  price: string;
};

const initialData: AddProducttDataType = {
  id: "",
  title: "",
  description: "",
  category: "",
  displayImages: "",
  price: "",
};
type ErrorType = {
  id: string;
  title: string;
  description: string;
  category: string;
  displayImages: string;
  price: string;
};
const initialError: ErrorType = {
  id: "",
  title: "",
  description: "",
  category: "",
  displayImages: "",
  price: "",
};

type AddProductProps = {
  formTitle: string;
  setFormTitle: React.Dispatch<React.SetStateAction<string>>;
  ids?: string;
  titleForm?: string;
  setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>;
  handleCloseClick?: () => void;
  handleCloseClickEdit?: () => void;
  formReset?: Boolean;
};
const AddProduct: React.FC<AddProductProps> = ({
  formTitle,
  setFormTitle,
  ids,
  titleForm,
  setIsLoading,
  handleCloseClick,
  handleCloseClickEdit,
  formReset,
}) => {
  const [foodItem, setFoodItem] =
    React.useState<AddProducttDataType>(initialData);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorType>(initialError);
  const [idRef, setIdRef] = React.useState<string>();
  const [imgUrls, setImgUrls] = React.useState<string>();
  const [images, setImages] = React.useState([]);
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);


  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFoodItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
    (document.getElementById(`${name}`) as HTMLInputElement).style.border =
      "0.5px solid #000";
  };

  const isValid = () => {
    let hasError = false;
    const copyErrors: any = { ...error };
    const validationFields = ["title", "description", "category", "price"];
    for (let key in copyErrors) {
      if (
        validationFields.includes(key) &&
        (foodItem[key as keyof typeof foodItem] === "" || 0)
      ) {
        copyErrors[key] = `Please input ${key}`;
        (document.getElementById(`${key}`) as HTMLInputElement).style.border =
          "0.5px solid red";
        hasError = true;
      }
    }
    setError(copyErrors);
    return hasError;
  };

  // Edit selected item
  const onEdit = async () => {
    const db = getFirestore();
    const docRef = doc(db, "food", `${ids}`);
    const data = {
      id: foodItem?.id,
      title: foodItem?.title,
      description: foodItem?.description,
      category: foodItem?.category,
      displayImages: imgUrls,
      price: foodItem?.price,
    };
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Food item is updated");
        const notifyEdit = () => toast("Food item is updated");
        notifyEdit();
        (
          document.getElementById("editModal") as HTMLInputElement
        ).style.display = "none";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add a new item
 
  const onAdd = async (foodItem: AddProducttDataType) => { 
   if (imgUrls) {
    const db = getFirestore();
    const dbRef = collection(db, "food");
    const newDocRef = doc(collection(db, "food"));
    setIdRef(newDocRef.id);
    setButtonDisable(true);
    await setDoc(newDocRef, {
      id: newDocRef.id,
      title: foodItem?.title,
      description: foodItem?.description,
      category: foodItem?.category,
      displayImages: imgUrls,
      price: foodItem?.price,
    })
      .then((docRef) => {
        console.log("Food item added successfully");
        // alert("Food item added successfully");
        const notifyAdd = () => toast("Food item added successfully");
        notifyAdd();
        (document.getElementById("modal") as HTMLInputElement).style.display =
          "none";        
          setButtonDisable(false);
      })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const notifyAdd = () => toast.error("Please upload Image!");
      notifyAdd();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {
      return;
    }
    try {
      if (edit) {
        onEdit();
      } else {
        onAdd(foodItem);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchDetails = async () => {
    const db = getFirestore();
    const docRef = doc(db, "food", `${ids}`);
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      const results = docSnap.data();
      let obj: AddProducttDataType = {
        id: results?.id,
        title: results?.title,
        description: results?.description,
        category: results?.category,
        displayImages: results?.displayImages,
        price: results?.price,
      };
      setFoodItem(obj);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {   
    if (ids) {
      fetchDetails();
      setEdit(true);
    }
  }, [ids]);
  

  React.useEffect(() => {   
    if (formReset === true){    
      setFoodItem(initialData);  
    }
  }, []);

  return (
    <React.Fragment>
      <section className="addproduct">
        <div className="addproduct__row">
          <h3 className="addproduct__row__title">{formTitle} </h3>
          <form
            className="addproduct__row__form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="addproduct__row__form__row">
              <div>
                <label className="addproduct__row__form__row__label">
                  Title
                  <span className="addproduct__row__form__row__label__required">
                    *
                  </span>
                </label>
              </div>
              <input
                className="addproduct__row__form__row__input"
                id="title"
                name="title"
                type="text"
                value={foodItem?.title}
                onChange={handleChange}
              />
              <span className="addproduct__row__form__row__error">
                {error.title}
              </span>
            </div>
            <div className="addproduct__row__form__row">
              <label className="addproduct__row__form__label">
                Description
                <span className="addproduct__row__form__row__label__required">
                  *
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                className="addproduct__row__form__input"
                onChange={handleChange}
                value={foodItem?.description}
                style={{ height: "70px" }}
              ></textarea>
              <span className="addproduct__row__form__row__error">
                {error.description}
              </span>
            </div>
            <div className="addproduct__row__form__row">
              <label className="addproduct__row__form__row__label">
                Category
                <span className="addproduct__row__form__row__label__required">
                  *
                </span>
              </label>
              <select
                className="addproduct__row__form__row__input__select"
                name="category"
                id="category"
                value={foodItem?.category}
                onChange={handleChange}
              >
                <option
                  className="addproduct__row__form__row__input__select__options"
                  value=""
                >
                  --- Select Category ---
                </option>

                <option
                  className="addproduct__row__form__row__input__select__options"
                  value="Breakfast"
                >
                  Breakfast
                </option>
                <option
                  className="addproduct__row__form__row__input__select__options"
                  value="Lunch"
                >
                  Lunch
                </option>
                <option
                  className="addproduct__row__form__row__input__select__options"
                  value="Dinner"
                >
                  Dinner
                </option>
              </select>
              <span className="addproduct__row__form__row__error">
                {error.category}
              </span>
            </div>
            <div className="addproduct__row__form__row">
              <label className="addproduct__row__form__row__label">
                Price
                <span className="addproduct__row__form__row__label__required">
                  *
                </span>
              </label>
              <input
                className="addproduct__row__form__row__input"
                id="price"
                name="price"
                type="number"
                value={foodItem?.price}
                onChange={handleChange}
              />
              <span className="addproduct__row__form__row__error">
                {error.price}
              </span>
            </div>

            <div className="addproduct__row__form__row">
              <label className="addproduct__row__form__row__label">
                Upload Image
                <span className="addproduct__row__form__row__label__required">
                  *
                </span>
              </label>
              <UploadImage idRef={idRef} setImgUrls={setImgUrls} />
            </div>
            <button
              type="submit"
              className="addproduct__row__form__row__button"
              disabled={buttonDisable}
            >
              {formTitle}
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddProduct;
