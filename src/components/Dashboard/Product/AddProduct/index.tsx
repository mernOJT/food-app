import React from "react";
import "./style.css";   

const AddProduct: React.FC = () => {
  return (
    <React.Fragment>      
        <section className="addproduct">
            <div  className="addproduct__row">
                <h3 className="addproduct__row__title">Add Product</h3>
                <form className="addproduct__row__form">   
                <div className="addproduct__row__form__row">
                     <label className="addproduct__row__form__row__label">Title</label>                
                     <input className="addproduct__row__form__row__input"
                        id = "title"
                        name = "title"                  
                        type="text"      
                    />
                </div>
                <div className="addproduct__row__form__row">
                    <label className="addproduct__row__form__label">Description</label>
                   <textarea  
                        id = "description" 
                        name= "description"
                        className="addproduct__row__form__input"
                         ></textarea>
                </div>
                <div className="addproduct__row__form__row">
                    <label className="addproduct__row__form__row__label">Category</label>                       
                    <select className="addproduct__row__form__row__input__select"                      
                        name="numberOfItems" 
                        id="numberOfItems">
                        <option className="addproduct__row__form__row__input__select__options" value="Breakfast">Breakfast</option>
                        <option className="addproduct__row__form__row__input__select__options" value="Lunch">Lunch</option>
                        <option className="addproduct__row__form__row__input__select__options" value="Dinner">Dinner</option>                       
                    </select>
                </div>
                   
                  
                <div className="addproduct__row__form__row">
                <label className="addproduct__row__form__row__label">Price</label>
                    <input className="addproduct__row__form__row__input"
                        id = "price"
                        name = "price"                  
                        type="number"      
                    />
                </div> 

                    {/* Multiple Image Upload   */}

                </form>
            </div>
        </section>
    </React.Fragment>
  );
};

export default AddProduct;