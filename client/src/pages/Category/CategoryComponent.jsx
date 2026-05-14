import CategoryList from "../CategoryList";
// import getCategories from "../../api/categoryService";
import Category from "../Category";
import { useNavigate } from "react-router-dom";

const CategoryComponent = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div>
      <CategoryList
        renderContent={(selected) => {
          if (selected === "Male")
            return (
              <div className="">
                <div className="flex flex-row flex-wrap gap-5  p-20">
                  {/* <Category data={categoryArr} /> */}
                  {items &&
                    items.map((product) => (
                      <Category
                        key={product.id}
                        data={product}
                        onCategoryClick={handleCategoryClick}
                      />
                    ))}
                </div>
              </div>
            );

          if (selected === "Female") return <div>Female products here 👗</div>;

          if (selected === "Child") return <div>Kids products here 🧸</div>;
        }}
      />
    </div>
  );
};

export default CategoryComponent;
