import React, { Component } from "react";
import { post_request } from "../../actions/lib";
import OptionModal from "./OptionModal";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      open: false,
      options: [],
      loading: false,
      item: {},
    };
    this.onCreate = this.onCreate.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDeleteOption = this.onDeleteOption.bind(this);
  }

  componentDidMount() {
    this.setState({
      page: this.props.page,
    });
  }

  onCreate = async (e, item, type) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (type === "category") {
      await post_request("product_category/create_product_category", item);
    } else if (type === "product") {
      await post_request("products/create_product", item);
    } else if (type === "ingredient") {
      await post_request("ingredients/create_ingredient", item);
    } else if (type === "choice") {
      await post_request("product_choices/new_product_choice", item);
    }
    this.setState({ loading: false });
  };

  setOpen() {
    let open = this.state.open ? false : true;
    this.setState({
      open: open,
    });
  }
  onAdd(value, price) {
    let open = this.state.open ? false : true;
    let options = this.state.options;
    options.push({ name: value, price: price });
    this.setState({
      open: open,
      options: options,
    });
  }

  onDeleteOption(idx) {
    this.setState({
      options: this.state.options.splice(idx - 1, 1),
    });
  }

  render() {
    let page = this.props.page;
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        {page === "product" ? (
          <ItemForm
            isUpdate={false}
            item={null}
            onCreate={(e, item) => this.onCreate(e, item, "product")}
            onUpdate={(e, item) => this.onCreate(e, item)}
            categories={this.props.categories}
            choices={this.props.choices}
            ingredients={this.props.ingredients}
            ingredientCategories={this.props.ingredientCategories}
          />
        ) : page === "category" ? (
          <CategoryForm
            isUpdate={false}
            item={null}
            onCreate={(e, item) => this.onCreate(e, item, "category")}
            onUpdate={(item) => this.onCreate(item)}
          />
        ) : page === "ingredient" ? (
          <IngredientForm
            isUpdate={false}
            item={null}
            onCreate={(e, item) => this.onCreate(e, item, "ingredient")}
            onUpdate={(e, item) => this.onCreate(e, item)}
            categories={this.props.ingredientCategories}
          />
        ) : page === "choice" ? (
          <ChoiceForm
            isUpdate={false}
            item={this.state.item}
            onCreate={(e, item) => this.onCreate(e, item, "choice")}
            onDelete={(idx) => this.onDeleteOption(idx)}
            onUpdate={(e, item) => this.onCreate(e, item)}
            open={this.state.open}
            setOpen={this.setOpen}
            onAdd={(value, price) => this.onAdd(value, price)}
            options={this.state.options}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default CreateForm;

const ItemForm = ({
  isUpdate,
  item,
  onCreate,
  onUpdate,
  categories,
  choices,
  ingredients,
}) => {
  let product = {
    name: isUpdate ? item.name : "",
    description: isUpdate ? item.description : "",
    price: isUpdate ? item.price : "",
    image: isUpdate ? item.image : "",
    category_id: isUpdate
      ? item.category_id
      : categories
      ? categories[0].ID
      : null,
    custom: isUpdate ? item.custom : false,
    choices_id: isUpdate ? item.choices_id : [],
    ingredients_id: isUpdate ? item.ingredients_id : [],
    available: isUpdate ? item.available : false,
    visible: isUpdate ? item.visible : false,
    default_ingredients: isUpdate ? item.default_ingredients : [],
  };
  onchange = (e) => {
    product[e.target.name] = e.target.value;
  };
  onselect = (e) => [(product[e.target.name] = e.target.value)];

  let display = product.custom ? "block" : "hidden";
  function onSelectCustom(e) {
    if (product.custom) {
      product.custom = false;
      document.getElementById("custom-ingredients").style.display = "none";
    } else {
      product.custom = true;
      document.getElementById("custom-ingredients").style.display = "block";
    }
  }

  function onChoiceSelect(e, id) {
    if (product.choices_id.includes(id)) {
      let index = product.choices_id.indexOf(id);
      product.choices_id.splice(index, 1);
    } else {
      product.choices_id.push(id);
    }
  }

  function onIngredientSelect(e, id) {
    if (product.ingredients_id.includes(id)) {
      let index = product.ingredients_id.indexOf(id);
      product.ingredients_id.splice(index, 1);
    } else {
      product.ingredients_id.push(id);
    }
  }

  onsubmit = (e) => {
    e.preventDefault();
    let body = new FormData();
    body.append("file", product.image);
    body.append("name", product.name);
    body.append("description", product.description);
    body.append("price", parseFloat(product.price).toFixed(2));
    body.append("choices_id", JSON.stringify(product.choices_id));
    body.append("ingredients_id", JSON.stringify(product.ingredients_id));
    body.append("custom", product.custom);
    body.append("category_id", product.category_id);
    body.append(
      "default_ingredients",
      JSON.stringify(product.default_ingredients)
    );
    isUpdate ? onUpdate(e, body) : onCreate(e, body);
  };

  let previewUrl = "";
  function onFileChange(e) {
    if (e.target.files[0]) {
      product.image = e.target.files[0];
      previewUrl = URL.createObjectURL(e.target.files[0]);
      document.getElementById("img-preview").src = previewUrl;
      document.getElementById("image-preview-div").style.visibility = "visible";
    }
  }
  return (
    <form className="w-full max-w-lg items-center" onSubmit={onsubmit}>
      {" "}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Όνομα
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="name"
            required
            type="text"
            onChange={onchange}
          />
        </div>
        <div className="w-full  px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Περιγραφή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="description"
            type="text"
            onChange={onchange}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Τιμή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            name="price"
            required
            onChange={onchange}
            type="number"
            step="0.01"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Κατηγορία
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="category_id"
              onSelect={onselect}
            >
              {categories ? (
                categories.map((c) => (
                  <option key={c.ID} value={c.ID}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option>Δεν υπάρχει ακόμα </option>
              )}
              {/* <option>Δημιουργία νέας </option> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="choices"
          >
            Επιλογές
          </label>
          <div className="relative px-3 ">
            <ul id="choice">
              {choices ? (
                choices.map((c) => (
                  <li key={c.ID}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) => onChoiceSelect(e, c.ID)}
                      />
                      <span className="ml-2">{c.name}</span>
                    </label>
                  </li>
                ))
              ) : (
                <option>Δεν υπάρχει ακόμα </option>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="choices"
          >
            Υλικά
          </label>
          <div className="relative px-3 ">
            <ul id="choice">
              {ingredients ? (
                ingredients.map((i) => (
                  <li key={i.ID}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) => onIngredientSelect(e, i.ID)}
                      />
                      <span className="ml-2">{i.name}</span>
                    </label>
                  </li>
                ))
              ) : (
                <option>Δεν υπάρχει ακόμα </option>
              )}
            </ul>
          </div>
        </div>
      </div>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        <input
          type="checkbox"
          className="form-checkbox"
          onChange={(e) => onSelectCustom(e)}
          defaultChecked={product.custom}
        />
        <span className="ml-2">Έχει επιλογές υλικών?</span>
      </label>
      <div
        className={`flex flex-wrap -mx-3 mb-6 ${display}`}
        id="custom-ingredients"
      >
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="choices"
          >
            Επιλογές Υλικών
          </label>
          <div className="relative px-3 ">
            <ul id="choice">
              {ingredients ? (
                ingredients.map((i) => (
                  <li key={i.ID}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) => onIngredientSelect(e, i.ID)}
                      />
                      <span className="ml-2">{i.name}</span>
                    </label>
                  </li>
                ))
              ) : (
                <option>Δεν υπάρχει ακόμα </option>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Φωτογραφία
        </label>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Εισάγετε αρχείο</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileChange}
            />
          </label>
        </div>
      </div>
      <div id="image-preview-div" style={{ visibility: "hidden" }}>
        <img id="img-preview" alt="img-preview" src={previewUrl} />
      </div>
      <SaveButton onSubmit={(e) => onsubmit(e)} />
    </form>
  );
};

const CategoryForm = ({ isUpdate, item, onCreate, onUpdate }) => {
  let category = {
    name: isUpdate ? item.name : "",
    description: isUpdate ? item.description : "",
    image: isUpdate ? item.image : "",
  };
  onchange = (e) => {
    category[e.target.name] = e.target.value;
  };
  onsubmit = (e) => {
    e.preventDefault();
    let body = new FormData();
    body.append("file", category.image);
    body.append("name", category.name);
    body.append("description", category.description);
    isUpdate ? onUpdate(e, body) : onCreate(e, body);
  };
  let previewUrl = "";
  function onFileChange(e) {
    if (e.target.files[0]) {
      category.image = e.target.files[0];
      previewUrl = URL.createObjectURL(e.target.files[0]);
      document.getElementById("img-preview").src = previewUrl;
      document.getElementById("image-preview-div").style.visibility = "visible";
    }
  }
  return (
    <form className="w-full max-w-lg items-center">
      {" "}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Όνομα
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="name"
            required
            type="text"
            onChange={onchange}
          />
        </div>
        <div className="w-full  px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Περιγραφή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="description"
            type="text"
            onChange={onchange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Φωτογραφία
        </label>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Εισάγετε αρχείο</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileChange}
            />
          </label>
        </div>
      </div>
      <div id="image-preview-div" style={{ visibility: "hidden" }}>
        <img id="img-preview" alt="img-preview" src={previewUrl} />
      </div>
      <SaveButton onSubmit={(e) => onsubmit(e)} />
    </form>
  );
};

const ChoiceForm = ({
  isUpdate,
  item,
  onCreate,
  onUpdate,
  onDelete,
  open,
  setOpen,
  onAdd,
  options,
}) => {
  let choice = {
    name: isUpdate ? item.name : "",
    description: isUpdate ? item.description : "",
    multiple: isUpdate ? item.multiple : false,
    required: isUpdate ? item.required : false,
    options: isUpdate ? item.options : options,
  };

  function onMultipleChange() {
    choice.multiple = true ? false : true;
  }
  function onRequiredChange() {
    choice.multiple = true ? false : true;
  }

  onchange = (e) => {
    choice[e.target.name] = e.target.value;
  };
  onsubmit = (e) => {
    e.preventDefault();
    isUpdate ? onUpdate(e, choice) : onCreate(e, choice);
  };
  return (
    <form className="w-full max-w-lg items-center" onSubmit={onsubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Όνομα
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="name"
            required
            type="text"
            onChange={onchange}
          />
        </div>
        <div className="w-full  px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Περιγραφή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="description"
            type="text"
            onChange={onchange}
          />
        </div>
      </div>
      <div className="flex flex-wrap px-3 -mx-3 mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => onMultipleChange(e)}
          />
          <span className="ml-2">Πολλαπλή επιλογή</span>
        </label>
      </div>
      <div className="flex flex-wrap px-3 -mx-3 mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => onRequiredChange(e)}
          />
          <span className="ml-2">Υποχρεωτική επιλογή</span>
        </label>
      </div>
      {options ? (
        options.map((o, idx) => {
          return (
            <ChoiceLabel
              key={idx}
              onDelete={() => onDelete(idx)}
              name={o.name}
              price={o.price}
            />
          );
        })
      ) : (
        <></>
      )}
      <AddChoiceButton setOpen={setOpen} />
      <SaveButton onSubmit={(e) => onsubmit(e)} />
      <OptionModal
        open={open}
        setOpen={setOpen}
        onAdd={(value, price) => onAdd(value, price, item)}
      />
    </form>
  );
};

const IngredientForm = ({ isUpdate, item, onCreate, onUpdate, categories }) => {
  let ingredient = {
    name: isUpdate ? item.name : "",
    description: isUpdate ? item.description : "",
    price: isUpdate ? item.price : 0,
    category: isUpdate ? item.category : categories ? categories[0] : null,
  };
  onchange = (e) => {
    ingredient[e.target.name] = e.target.value;
  };

  onselect = (e) => {
    if (e.target.value === "new") {
      document.getElementById("grid-category").style.display = "block";
    } else {
      document.getElementById("grid-category").style.display = "none";
    }
  };
  onsubmit = (e) => {
    e.preventDefault();
    ingredient.price = parseFloat(ingredient.price).toFixed(2);
    // console.log("here");
    isUpdate ? onUpdate(e, ingredient) : onCreate(e, ingredient);
  };

  return (
    <form className="w-full max-w-lg items-center" onSubmit={onsubmit}>
      {" "}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Όνομα
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="name"
            type="text"
            required
            onChange={onchange}
          />
        </div>
        <div className="w-full  px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Περιγραφή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="description"
            type="text"
            onChange={onchange}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Τιμή
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            name="price"
            onChange={onchange}
            type="number"
            required
            step="0.01"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Κατηγορία
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="category"
              onChange={onselect}
            >
              {categories.length > 0 ? (
                categories.map((c, idx) => <option key={idx}>{c}</option>)
              ) : (
                <option>Δεν υπάρχει ακόμα </option>
              )}
              <option value="new" key={0}>
                Δημιουργία νέας
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6 hidden" id="grid-category">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Νέα Κατηγορία
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="category"
            onChange={onchange}
            type="text"
          />
        </div>
      </div>
      <SaveButton onSubmit={(e) => onsubmit(e)} />
    </form>
  );
};

const SaveButton = ({ onSubmit }) => {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button
        type="button"
        onClick={(e) => onSubmit(e)}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Αποθήκευση
      </button>
    </div>
  );
};

const AddChoiceButton = ({ setOpen }) => {
  return (
    <div className="px-4 py-3  text-left sm:px-6">
      <button
        type="button"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={setOpen}
      >
        Προσθήκη Υποεπιλογής
      </button>
    </div>
  );
};

const ChoiceLabel = ({ onDelete, idx, name, price }) => {
  return (
    <div className="px-4 py-3  text-left sm:px-6">
      <span className="w-1/2 px-3">{name}</span>
      <span className="w-1/2 px-3">{price.toFixed(2)}</span>
      <button onClick={onDelete}>Cancel</button>
    </div>
  );
};
