import ItemCards from "./ItemCards";
import { FaAngleDown } from "react-icons/fa6";


function RestaurantCategory({data, showItems, setShowIndex}){



    function handleClick (){
     setShowIndex();
    };
    

    return(
     <div className="">
      
      <div className="  py-2 my-2 ">
        
        <div className="flex justify-between cursor-pointer  items-center"  onClick={handleClick}>
        <span className="text-[16.5px] font-extrabold   my-2 cursor-pointer leading-[20px] teacking-[-0.3px] " >
            {data.title} ({data.itemCards.length})</span>
        <span > < FaAngleDown/> </span>
        </div>

        <div>
          {  showItems && <ItemCards items={data.itemCards} />}
        </div>
      </div>
      <div className="bg-gray-100 h-1 md:h-4 "></div>

     </div>


    );


}

export default RestaurantCategory