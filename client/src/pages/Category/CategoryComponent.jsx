import CategoryList from "../CategoryList";
import getCategories from "../../api/categoryService";
import Category from "../Category";

const CategoryComponent = ({ items }) => {
  console.log("Category component loaded.", items);

  return (
    <div>
      <CategoryList
        renderContent={(selected) => {
          if (selected === "Male")
            return (
              <div className="">
                <div>
                  <p className="text-left pl-20 text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom ">
                    Category List
                  </p>
                </div>
                <div className="flex flex-row flex-wrap gap-5  p-20">
                  {/* <Category data={categoryArr} /> */}
                  {items &&
                    items.map((product) => (
                      <Category key={product.id} data={product} />
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
