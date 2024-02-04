import { ReturnProps } from "@/interfaces/DisplayTiles";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import 'src/styles/swiper.css';

interface DisplayTilesProps {
    returns: ReturnProps | undefined;
    investAmount: string
}

export const DisplayTiles = ({ returns, investAmount, ...props }: DisplayTilesProps) => {

    const calculateRate = (principal: number, returns: number) => {
        if (principal === 0) {
            return 0; // Avoid division by zero
        }
        const rate = (returns / principal) * 100;
        return rate.toFixed(2);
    };

    return (
        <div className="md:grid grid-rows-2 py-3 px-3 pb-3">

            {/* mobile */}
            <div className="md:hidden">
                <Swiper
                    navigation={true} modules={[Navigation]}
                >
                    <SwiperSlide>
                        <div className=" bg-orange-300  h-72 rounded-lg hover:shadow-md">
                            <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 6 months but not later than 12 months.">{`Returns : 6 months later`}</label>
                            <div className="grid grid-rows-4 gap-5 py-8 px-5">
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Rate :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.six ? calculateRate(Number(investAmount), Number(returns.six)) : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Principal :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={investAmount ? `${investAmount} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Return :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.six ? `${returns.six} (BDT)` : ``}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="w-20" htmlFor="">
                                        Total :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.six ? `${Number(investAmount) + Number(returns.six)}  (BDT)` : ''}
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className=" bg-violet-300  h-72 rounded-lg hover:shadow-md">
                            <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 12 months but not later than 18 months." >{`Returns : 12 months later`}</label>
                            <div className="grid grid-rows-4 gap-5 py-8 px-5">
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Rate :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twelve ? calculateRate(Number(investAmount), Number(returns.twelve)) : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Principal :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={investAmount ? `${investAmount} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Return :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twelve ? `${returns.twelve} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="w-20" htmlFor="">
                                        Total :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twelve ? `${Number(investAmount) + Number(returns.twelve)} (BDT)` : ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className=" bg-blue-300  h-72 rounded-lg hover:shadow-md">
                            <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 18 months but not later than 24 months.">{`Returns : 18 months later`}</label>
                            <div className="grid grid-rows-4 gap-5 py-8 px-5">
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Rate :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.eighteen ? calculateRate(Number(investAmount), Number(returns.eighteen)) : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Principal :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={investAmount ? `${investAmount} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Return :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.eighteen ? `${returns.eighteen} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="w-20" htmlFor="">
                                        Total :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.eighteen ? `${Number(investAmount) + Number(returns.eighteen)} (BDT)` : ''}
                                    />
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>

                    <SwiperSlide>
                        <div className=" bg-red-400  h-72 rounded-lg hover:shadow-md">
                            <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 24 months but not later than 18 months.">{`Returns : 24 months later`}</label>
                            <div className="grid grid-rows-4 gap-5 py-8 px-5">
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Rate :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twentyfour ? calculateRate(Number(investAmount), Number(returns.twentyfour)) : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Principal :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={investAmount ? `${investAmount} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Return :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twentyfour ? `${returns.twentyfour} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="w-20" htmlFor="">
                                        Total :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.twentyfour ? `${Number(investAmount) + Number(returns.twentyfour)} (BDT)` : ''}
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className=" bg-green-300  h-72 rounded-lg hover:shadow-md">
                            <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 5 years." >{`Returns : 5 years later`}</label>
                            <div className="grid grid-rows-4 gap-5 py-8 px-5">
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Rate :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.matured ? calculateRate(Number(investAmount), Number(returns.matured)) : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Principal :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={investAmount ? `${investAmount} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center ">
                                    <label className="w-20" htmlFor="">
                                        Return :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.matured ? `${returns.matured} (BDT)` : ''}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="w-20" htmlFor="">
                                        Total :
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input form-input-sm w-44 ml-2"
                                        value={returns?.matured ? `${Number(investAmount) + Number(returns.matured)} (BDT)` : ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>



                </Swiper>
            </div>


            {/* desktop */}
            <div className="hidden md:flex items-center justify-center px-5 my-5 gap-5">

                <div className=" bg-orange-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 6 months but not later than 12 months.">{`Returns : 6 months later`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.six ? calculateRate(Number(investAmount), Number(returns.six)) : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={investAmount ? `${investAmount} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.six ? `${returns.six} (BDT)` : ``}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.six ? `${Number(investAmount) + Number(returns.six)}  (BDT)` : ''}
                            />
                        </div>
                    </div>

                </div>

                <div className=" bg-violet-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 12 months but not later than 18 months." >{`Returns : 12 months later`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twelve ? calculateRate(Number(investAmount), Number(returns.twelve)) : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={investAmount ? `${investAmount} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twelve ? `${returns.twelve} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twelve ? `${Number(investAmount) + Number(returns.twelve)} (BDT)` : ''}
                            />
                        </div>
                    </div>
                </div>

                <div className=" bg-blue-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 18 months but not later than 24 months.">{`Returns : 18 months later`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.eighteen ? calculateRate(Number(investAmount), Number(returns.eighteen)) : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={investAmount ? `${investAmount} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.eighteen ? `${returns.eighteen} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.eighteen ? `${Number(investAmount) + Number(returns.eighteen)} (BDT)` : ''}
                            />
                        </div>
                    </div>
                </div>


            </div>

            <div className="hidden md:flex items-center justify-center px-5 my-5 gap-5">

                <div className=" bg-red-400  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 24 months but not later than 18 months.">{`Returns : 24 months later`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twentyfour ? calculateRate(Number(investAmount), Number(returns.twentyfour)) : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={investAmount ? `${investAmount} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twentyfour ? `${returns.twentyfour} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.twentyfour ? `${Number(investAmount) + Number(returns.twentyfour)} (BDT)` : ''}
                            />
                        </div>
                    </div>

                </div>

                <div className=" bg-green-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 5 years." >{`Returns : 5 years later`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.matured ? calculateRate(Number(investAmount), Number(returns.matured)) : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={investAmount ? `${investAmount} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.matured ? `${returns.matured} (BDT)` : ''}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                                value={returns?.matured ? `${Number(investAmount) + Number(returns.matured)} (BDT)` : ''}
                            />
                        </div>
                    </div>
                </div>

            </div>


        </div>


    )
}