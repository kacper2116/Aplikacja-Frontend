import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import { useSearchParams } from "react-router-dom";

const MultiSelectList = ({ name, label ,listItems, functionSetFilter }) => {


  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItems, setSelectedItems] = useState();

  const options = listItems.map(item => ({ value: item, label: item }));

  useEffect(() => {

    if (searchParams.getAll(name).length > 0) {

      const data = JSON.parse(searchParams.getAll(name))

      const selectedItemsFromUrl = data.map(item => ({ value: item, label: item }));
      setSelectedItems(selectedItemsFromUrl)

    }


  }, [])

  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    const values = selectedOptions.map((option) => option.value)

    if (functionSetFilter) {
      functionSetFilter(name, values)

    }

  };

  const MultiValueRemove = ({ innerProps }) => {

    return (
      <div {...innerProps} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <FaTimes style={{ marginLeft: '4px' }} />
      </div>
    );
  };

    return (


      <div>

        <label htmlFor="MultiSelectList"><h2>{label.charAt(0).toUpperCase() + label.slice(1)}</h2></label>
        <Select

          id="MultiSelectList"
          name={label}
          value={selectedItems}
          onChange={handleSelectChange}
          options={options}
          isSearchable={false}
          isMulti
          components={{ MultiValueRemove }}
          menuMaxHeight={250}

        />

      </div>
    );

};

export default MultiSelectList