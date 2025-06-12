import BenefitCard from "../Contact/BenefitCard";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';

const Benefits = () => {
    
    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 py-8 gap-8 lg:py-20 px-4">
                <BenefitCard icon={<WatchLaterOutlinedIcon sx={{ fontSize: 60 }} color="disabled"/>} title="save your time" desc="No more waiting in long queues your food arrives faster than ever.Pre-order and schedule deliveries to match your routine.We handle the hassle, so you can focus on what matters most." />
                <BenefitCard icon={<SellOutlinedIcon sx={{ fontSize: 60 }} color="disabled"/>} title="Regular discount" desc="Get access to daily deals and exclusive app-only offers.Save more with every order — loyalty that pays off.Affordable food, without compromising taste or quality." />
                <BenefitCard icon={<SoupKitchenOutlinedIcon sx={{ fontSize: 60 }} color="disabled"/>} title="Variety food" desc="From local favorites to global delicacies all in one app.Choose from a wide range of cuisines to suit every taste.New dishes added regularly to keep your menu exciting." />
        </div>
        </>
    )
}
export default Benefits