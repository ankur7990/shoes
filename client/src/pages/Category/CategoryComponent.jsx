// import CategoryList from "../CategoryList";
// import getCategories from "../../api/categoryService";
import Category from "../Category";

const CategoryComponent = ({ items }) => {
  return (
    <div className="">
      <div className="flex flex-row flex-wrap gap-5  p-20">
        {/* <Category data={categoryArr} /> */}
        {items &&
          items.map((category) => (
            <Category
              key={category.id}
              data={category}
              //onCategoryClick={handleCategoryClick}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
