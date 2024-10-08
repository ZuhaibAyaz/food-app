import { CDN_URL } from "../utils/constants";
const TopCarousel = (props) =>{
    const {category} =props;


    const{imageId}= category || {};


return(
    <div className="">
        <img   
        src={CDN_URL + imageId} 
        alt="food"
        className=" h-[180px] w-[145px] "
        />
        </div>
);
}

export default TopCarousel