import React from "react";
import "./style.css";
import Sidebar from "../../Sidebar";
import AddProduct from "../AddProduct";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseDatabase, storage } from "../../../../database/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "../../../Backdrop";
import { deleteObject, ref } from "firebase/storage";

export type ProductListDataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  foodImage: string;
  price: string;
};
const initialData: ProductListDataType = {
  id: "",
  title: "",
  description: "",
  category: "",
  foodImage: "",
  price: "",
};

const ProductList: React.FC = () => {
  const [foodItem, setFoodItem] = React.useState<ProductListDataType[]>([]);
  const [formTitle, setFormTitle] = React.useState<string>("");
  const [ids, setIds] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [isChange, setIsChange] = React.useState<Boolean>(false);
  const [formReset, setFormReset] = React.useState<Boolean>(false);
  const [modalOpen, setModalOpen] = React.useState<Boolean>(false);
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const [add, setAdd] = React.useState<Boolean>(false);
  const [edit, setEdit] = React.useState<Boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<Boolean>(false);
  const [foodID, setFoodID] = React.useState<string>("");
  const [backdrop, setBackdrop] = React.useState<Boolean>(true);
  const [imageURL, setImageURL] = React.useState<string>("");

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getData = async () => {
    setBackdrop(true);
    const colRef = collection(firebaseDatabase, "food");
    try {
      const result = await getDocs(colRef);
      const prepareData = result?.docs.map((item) => {
        let temp = item.data();
        let obj: ProductListDataType = {
          id: temp.id,
          title: temp.title,
          description: temp.description,
          category: temp.category,
          foodImage: temp.foodImage,
          price: temp.price,
        };
        return obj;
      });
      setFoodItem(prepareData);
      setBackdrop(false);
      // setIsChange(false);
      // setIsLoading(true);
      return prepareData;
    } catch (error) {
      console.log(error);
    }
  };

  //Image delete from firebase storage
  const handleImageDelete = () => {
    const imageRef = ref(storage, `images/${imageURL}`);
    deleteObject(imageRef)
      .then(() => {
        console.log("Image delete from firebase Storage");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleDelete = (id: string) => {
    setButtonDisable(true);
    var val = true;
    if (val === true) {
      const db = getFirestore();
      const foodId = id.toString();
      const docRef = doc(db, "food", `${foodId}`);
      deleteDoc(docRef)
        .then(() => {
          console.log("One food item has been deleted successfully.");
          setIsLoading(!isLoading);
          setDeleteModal(false);
          setButtonDisable(false);
          const notifyDelete = () => toast("Food item is deleted");
          notifyDelete();
        })
        .catch((error) => {
          console.log(error);
        });
      //Image delete from firebase storage
      handleImageDelete();
      return true;
    } else {
      console.log("Process Aborted");
      return false;
    }
  };

  React.useEffect(() => {
    getData();
  }, [isLoading]);

  React.useEffect(() => {
    getData();
  }, [isChange]);

  console.log(foodItem);

  return (
    <React.Fragment>
      <Sidebar />
      <section className="productlist">
        <ToastContainer />

        <div className="productlist__row">
          <h3 className="productlist__row__title">Product list</h3>
          <div className="productlist__row__button">
            <button
              className="productlist__row__button__btn"
              onClick={() => {
                handleModalOpen();
                setAdd(true);
              }}
            >
              + add
            </button>
            {add && modalOpen && (
              <div id="modal" className="productlist__row__modal">
                <div className="productlist__row__modal__content">
                  <span
                    className="productlist__row__modal__content__close"
                    onClick={() => {
                      setFormReset(true);
                      handleModalClose();
                      setAdd(false);
                    }}
                  >
                    &times;
                  </span>
                  <AddProduct
                    formTitle="Add Product"
                    foodItemData={foodItem}
                    setFormTitle={setFormTitle}
                    isChange={isChange}
                    setIsChange={setIsChange}
                    formReset={formReset}
                    setFormReset={setFormReset}
                    setModalOpen={setModalOpen}
                  />
                </div>
              </div>
            )}
          </div>
          <table className="productlist__row__table">
            <tr className="productlist__row__table__row">
              <th className="productlist__row__table__row__text">Title</th>
              <th className="productlist__row__table__row__text">Image</th>
              <th className="productlist__row__table__row__text">Category</th>
              <th className="productlist__row__table__row__text">Price</th>
              <th className="productlist__row__table__row__text">Actions</th>
            </tr>
            {backdrop ? (
              <Backdrop />
            ) : (
              <>
                {foodItem?.map((foods) => {
                  return (
                    <tr
                      className="productlist__row__table__row"
                      key={foods?.id}
                    >
                      <td className="productlist__row__table__row__text">
                        {foods.title}
                      </td>
                      <td className="productlist__row__table__row__text">
                        <img
                          height="50px"
                          width="50px"
                          src={foods.foodImage}
                          alt="Food Images"
                        />
                      </td>
                      <td className="productlist__row__table__row__text">
                        {foods.category}
                      </td>
                      <td className="productlist__row__table__row__text">
                        {foods.price}
                      </td>
                      <td className="productlist__row__table__row__text">
                        <button
                          className="productlist__row__table__row__button__edit"
                          onClick={() => {
                            setFormTitle("Edit Product");
                            setIds(foods.id);
                            setTitle(foods.title);
                            setEdit(true);
                            setAdd(false);
                            setModalOpen(true);
                          }}
                        >
                          edit
                        </button>
                        {edit && modalOpen && (
                          <div
                            id="editModal"
                            className="productlist__row__modal"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                          >
                            <div className="productlist__row__modal__content">
                              <span
                                className="productlist__row__modal__content__close"
                                onClick={() => {
                                  handleModalClose();
                                  setEdit(false);
                                }}
                              >
                                &times;
                              </span>
                              <AddProduct
                                formTitle="Edit Product"
                                foodItemData={foodItem}
                                setFormTitle={setFormTitle}
                                ids={ids}
                                titleForm={title}
                                isChange={isChange}
                                setIsChange={setIsChange}
                                formReset={formReset}
                                setFormReset={setFormReset}
                                setModalOpen={setModalOpen}
                              />
                            </div>
                          </div>
                        )}
                        <button
                          className="productlist__row__table__row__button__delete"
                          disabled={buttonDisable}
                          onClick={() => {
                            setDeleteModal(true);
                            console.log(foods.id);
                            setFoodID(foods.id);
                            setImageURL(
                              foods.foodImage.split("2F")[1].split("?")[0]
                            );
                          }}
                        >
                          delete
                        </button>
                        {deleteModal && (
                          <div className="productlist__row__table__row__button__delete__modal">
                            <span
                              className="productlist__delete__modal__close"
                              onClick={() => {
                                setDeleteModal(false);
                                setButtonDisable(false);
                              }}
                            >
                              &times;
                            </span>
                            <div className="productlist__delete__modal__confirm">
                              <div>
                                Are you sure you want to delete this record?
                              </div>
                              <div>
                                <button
                                  style={{ backgroundColor: "crimson" }}
                                  disabled={buttonDisable}
                                  onClick={() => {
                                    handleDelete(foodID);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  style={{ backgroundColor: "grey" }}
                                  onClick={() => {
                                    setDeleteModal(false);
                                    setButtonDisable(false);
                                    console.log("cancel: ", foodID);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {!foodItem?.length && (
                  <h1 className="productlist__row__table__nodata">
                    No Data Found!
                  </h1>
                )}
              </>
            )}
          </table>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductList;
