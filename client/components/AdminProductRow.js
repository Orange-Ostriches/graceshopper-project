import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProduct } from '../store/singleProduct';

const AdminProductRow = props => {

  const {id, name, price, fuelType, size, range, specialty, topSpeed, autopilot, description, image} = props.product;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editFuelType, setEditFuelType] = useState(fuelType);
  const [editSize, setEditSize] = useState(size);
  const [editRange, setEditRange] = useState(range);
  const [editSpecialty, setEditSpecialty] = useState(specialty);
  const [editTopSpeed, setEditTopSpeed] = useState(topSpeed);
  const [editAutopilot, setEditAutopilot] = useState(autopilot);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(image);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const editedProduct = {
      id,
      name: editName,
      price: editPrice,
      fuelType: editFuelType,
      size: editSize,
      range: editRange,
      specialty: editSpecialty,
      topSpeed: editTopSpeed,
      autopilot: editAutopilot,
      description: editDescription,
      image: editImage
    }
    console.log(editedProduct);
    dispatch(updateProduct(editedProduct))
    setEditing(!editing)
  }

  return (
    <tr className="product-row">
      {!editing ? (
        <>
          <td>
            <button
              value="edit"
              type="button"
              onClick={() => setEditing(!editing)}
            >Edit</button>
          </td>
          <td></td>
          <td><Link to={`/products/${id}`}>{name}</Link></td>
          <td>{price}</td>
          <td>{fuelType}</td>
          <td>{size}</td>
          <td>{range}</td>
          <td>{specialty}</td>
          <td>{topSpeed}</td>
          <td>{autopilot ? 'Yes' : 'No'}</td>
          <td>{description}</td>
          <td>{image}</td>
        </>
      ) : (
        <>
          <td>
            <form id="edit-product">
              <button
                value="cancel"
                type="button"
                onClick={() => setEditing(!editing)}
              >Cancel</button>
              </form>
          </td>
          <td>
            <button
              value="submit"
              type="button"
              onClick={(e) => handleSubmit(e)}
              form="edit-product"
            >Submit</button>
          </td>
          <td>
            <input
              name="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder={name}
              form="edit-product"
            />
          </td>
          <td>
            <input
              name="price"
              value={editPrice}
              onChange={(e) => setEditPrice(parseInt(e.target.value))}
              placeholder={price}
              form="edit-product"
            />
          </td>
          <td>
            <select
              name="fuelType"
              onChange={(e) => setEditFuelType(e.target.value)}
              placeholder={fuelType}
              form="edit-product"
            >
              <option value="Plutonium">Plutonium</option>
              <option value="Uranium">Uranium</option>
              <option value="Hydrogen">Hydrogen</option>
            </select>
          </td>
          <td>
            <select
              name="size"
              onChange={(e) => setEditSize(e.target.value)}
              placeholder={size}
              form="edit-product"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </td>
          <td>
            <input
              name="range"
              value={editRange}
              onChange={(e) => setEditRange(parseInt(e.target.value))}
              placeholder={range}
              form="edit-product"
            />
          </td>
          <td>
            <select
              name="specialty"
              onChange={(e) => setEditSpecialty(e.target.value)}
              placeholder={specialty}
              form="edit-product"
            >
              <option value="Combat">Combat</option>
              <option value="Exploration">Exploration</option>
              <option value="Mining">Mining</option>
              <option value="Transportation">Transportation</option>
            </select>
          </td>
          <td>
            <input
              name="topSpeed"
              value={editTopSpeed}
              onChange={(e) => setEditTopSpeed(parseInt(e.target.value))}
              placeholder={topSpeed}
              form="edit-product"
            />
          </td>
          <td>
            <select
              name="autopilot"
              onChange={(e) => setEditAutopilot(e.target.value === "true")}
              placeholder={autopilot ? "True" : "False"}
              form="edit-product"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </td>
          <td>
            <input
              name="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder={description}
              form="edit-product"
            />
          </td>
          <td>
            <input
              name="image"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              placeholder={image}
              form="edit-product"
            />
          </td>
        </>
      )}
    </tr>
  )
}

export default AdminProductRow;
