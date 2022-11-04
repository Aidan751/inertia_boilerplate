import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import { X } from "lucide-react";
import Title from "@/Components/Title";
import Input from "@/Components/Input";

function Create(props) {
    console.log(props);
  const { data, setData, post, processing, errors } = useForm({
    restaurant_id: "",
    title: "",
    description: "",
    group_deal_price: "",
    existingMenuItems: props.existingMenuItems,
    group_deal_item_title: "",
    menuItemId: "",
  });

  const [imageUrl, setImageUrl] = useState({
    image: null,
  });

  const [groupDealItems, setGroupDealItems] = useState([
    {
      id: 1,
      existingMenuItems: props.existingMenuItems,
      title: "",
    },
    {
      id: 2,
      existingMenuItems: props.existingMenuItems,
      title: "",
    },
  ]);

  const [menuItems, setMenuItems] = useState([
    [

    ],
    [

    ]
  ]);

  const addGroupDealItem = () => {

    let newMenuItems = [...menuItems, []];

    setMenuItems(newMenuItems);

    setGroupDealItems([
      ...groupDealItems,
      {
        id: groupDealItems.length + 1,
        title: "",
      },
    ]);
  };

  const addMenuItem = (event) => {

    setData("menuItemId", event.target.value);

    const index = parseInt(event.target.id);

    data.existingMenuItems.forEach((item) => {

      if (item.id == event.target.value) {

        let newMenuItems = [...menuItems];

        newMenuItems[index].push({
          id: item.id,
          title: item.title,
          join_id: index + 1,
        });

        setMenuItems(newMenuItems);

      }
    });
  };

  // to input elements and record their values in state
  const handleSizeInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizes];
    list[index][name] = value;
    setSizes(list);
  };

  const handleMenuItemInputChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
    const { name, value } = e.target;
    const list = [...extras];
    list[name] = value;
    setExtras(list);
    console.log(name, value, list);
  };

  // user click yes delete a specific row of id:i
  const handleGroupDealRemoveClick = (i) => {
    const list = [...groupDealItems];
    list.splice(i, 1);
    setGroupDealItems(list);
  };

  const handleMenuItemRemoveClick = (index,group_deal_key) => {


    const list = [...menuItems];

    list[group_deal_key].splice(index, 1);
    setMenuItems(list);
  };

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const changeGroupDealTitle = (event,index) => {


    event.preventDefault();

    const value  = event.target.value;
    const newGroupDealItems = [...groupDealItems];

    newGroupDealItems[index].title = value;

    setGroupDealItems(newGroupDealItems);

  }

  const submit = (e) => {
    e.preventDefault();
    post(
      route("restaurant.group-deals.store", {
        menuItems: menuItems,
        groupDealItems: groupDealItems,
      })
    );
  };

  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors}>
        <div className="col-span-12">
          <Title title="Create Group Deal" />
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}
              <form className="intro-y box p-5" onSubmit={submit}>
                {/* Start: title */}
                <div className="mb-6 mt-6">
                  <label
                    className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 pl-3 text-sm border-gray-300 focus:border-indigo-300 leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title..."
                    name="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-xs italic text-red-500">
                      {errors.title}
                    </p>
                  )}
                </div>
                {/* End: title */}
                {/* Start: description */}
                <div className="mb-6">
                  <label
                    className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 pl-3 text-sm leading-tight border-gray-300 focus:border-indigo-300 text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="description"
                    type="text"
                    placeholder="Description..."
                    name="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-xs italic text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>
                {/* End: description */}
                {/* Start: price */}
                <div className="mb-6">
                  <label
                    className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                    htmlFor="price"
                  >
                    Regular Price
                  </label>
                  <input
                    className="w-full px-3 py-2 pl-3 text-sm leading-tight border-gray-300 focus:border-indigo-300 text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="group_deal_price"
                    type="text"
                    name="group_deal_price"
                    value={data.group_deal_price}
                    placeholder="Price..."
                    onChange={(e) =>
                      setData("group_deal_price", e.target.value)
                    }
                  />
                  {errors.group_deal_price && (
                    <p className="text-xs italic text-red-500">
                      {errors.group_deal_price}
                    </p>
                  )}
                </div>
                {/* End: price */}
                <hr />
                {
                  groupDealItems.map((group_deal_item, group_deal_index) => {
                   return (
                    <>
                      <Title
                        title={`Select Items for Group Deal Item ${group_deal_index + 1}`}
                        subtitle={`Search and select all the products to be shown in Item ${group_deal_index + 1} of the group deal`}
                      />

                  <select
                    className="w-full mt-2 px-3 py-2 pl-3 leading-tight text-gray-700 border-gray-300 focus:border-indigo-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id={group_deal_index}
                    itemID={group_deal_index}
                    type="text"
                    name="menu_item_id"
                    value={data.menuItemId}
                    onChange={addMenuItem}
                  >
                    <option value="">Select Item</option>
                    {data.existingMenuItems.map((item, key) => (
                      <option key={key} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                  {errors.existingMenuItems && (
                    <p className="text-xs italic text-red-500">
                      {errors.existingMenuItems}
                    </p>
                  )}

                      {/* start: table mapping extras added to group deal */}
                      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2">
                          <thead>
                            <tr>
                              <th className="whitespace-no-wrap">SELECTED ITEMS</th>
                              <th className="whitespace-no-wrap text-center">
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {menuItems[group_deal_index].map((menu_item, menu_item_key) => {
                              return (
                                <tr className="intro-x">
                                  <td>
                                    <a
                                      href=""
                                      className="font-medium whitespace-no-wrap"
                                    >
                                      {menu_item.title}
                                    </a>
                                  </td>
                                  <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                      <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() =>
                                          handleMenuItemRemoveClick(menu_item_key, group_deal_index)
                                        }
                                      >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {/* end: table mapping items added to group deal */}
                      {/* start: test to show in app deal */}
                      <div className="flex flex-col items-start mt-2">
                      Choose your <input
                          type={"text"}
                          name={"single_group_deal_item_title"}
                          value={groupDealItems[group_deal_index].title}
                          className={
                              ` mt-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm `
                          }
                          placeholder="eg. Main"
                          autoComplete=""
                          required={true}
                          onChange={(e) => changeGroupDealTitle(e,group_deal_index)}
                      />
                  </div>

                    </>
                  );
                })}

                {/* Start: Button to add another group deal item */}
                <div className="mb-6 flex justify-start">
                  <Button
                    className="btn btn-primary mt-3"
                    type="button"
                    click={addGroupDealItem}
                  >
                    {groupDealItems.length > 0 ? "Add another" : "Add group deal item"}
                  </Button>
                </div>
                {/* End: Button to add another group deal item */}
                <div className="text-right mt-5">
                  <Button type="submit" className="w-30">
                    Save
                  </Button>
                </div>
              </form>
              {/* END: Form Layout */}
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
}

export default Create;
