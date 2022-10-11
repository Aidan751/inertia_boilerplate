import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import { X } from "lucide-react";
import Title from "@/Components/Title";
import Input from "@/Components/Input";

function Edit(props) {
    const { data, setData, put, processing, errors } = useForm({
        groupDeal: props.groupDeal,
        groupDealItems: props.groupDealItems,
        existingMenuItems: props.existingMenuItems,
        groupDealSingleItems: props.groupDealSingleItems,
        title: props.groupDeal.title,
        group_deal_price: props.groupDeal.group_deal_price,
        description: props.groupDeal.description,
        dietary_requirements: props.groupDeal.dietary_requirements,
        menuItemId: ""
      });

      const [groupDealSingleItems, setGroupDealSingleItems] = useState(
        data.groupDealSingleItems
      );
      const [groupDealItems, setGroupDealItems] = useState(data.groupDealItems);
      const [itemTitle, setItemTitle] = useState("");


      const addGroupDealItem = () => {
        let newMenuItems = [...groupDealSingleItems, {}];

        setGroupDealSingleItems(newMenuItems);


        setData("groupDealItems", [
            ...data.groupDealItems,
            {
                id: data.groupDealItems.length + 1,
                title: ""
            }
        ]);
        console.log(groupDealItems);
      };

      const addMenuItem = (event) => {

        setData("menuItemId", event.target.value);

        const index = parseInt(event.target.id);

        data.existingMenuItems.forEach((item) => {
          if (item.id === parseInt(event.target.value)) {

            let newMenuItems = [...data.groupDealSingleItems];

            newMenuItems.push({
                group_deal_item_id: index + 1,
                group_deal_id: data.groupDeal.id,
                menu_item_id: parseInt(event.target.value) - 1,
            });

            setGroupDealSingleItems(newMenuItems);
            setData("groupDealSingleItems", newMenuItems);
        }
        });
    };

      const handleMenuItemRemoveClick = (menu_item_key, group_deal_key) => {
        const list = [...groupDealSingleItems];
        list.splice(menu_item_key, 1);
        setGroupDealSingleItems(list);
      };

      const changeGroupDealTitle = (event, index) => {
        event.preventDefault();


        setItemTitle(event.target.value);
        const value = event.target.value;
        const newGroupDealItems = [...data.groupDealItems];

        newGroupDealItems[index].title = value;

        setData('groupDealItems', newGroupDealItems);
      };



  const submit = (e) => {
    e.preventDefault();
    put(
      route("restaurant.group-deals.update", props.groupDeal.id, {
        groupDealItems: groupDealItems,
        groupDealSingleItems: groupDealSingleItems,
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
                  data.groupDealItems.map((group_deal_item, group_deal_index) => {
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
                    name="menuItemId"
                    value={data.menuItemId}
                    onChange={(e) => addMenuItem(e, group_deal_index)}
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
                            {groupDealSingleItems.map((menu_item, menu_item_key) => {
                              {return menu_item.group_deal_item_id === group_deal_item.id && (
                                <tr className="intro-x">
                                  <td>
                                    <a
                                      href=""
                                      className="font-medium whitespace-no-wrap"
                                    >
                                      {data.existingMenuItems[menu_item.menu_item_id].title}
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
                              );}
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
                          value={data.groupDealItems[group_deal_index].title}
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
                    {data.groupDealItems.length > 0 ? "Add another" : "Add size option"}
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

export default Edit;
