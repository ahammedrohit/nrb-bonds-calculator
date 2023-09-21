interface DisplayTilesProps { }

export const DisplayTiles = ({ ...props }: DisplayTilesProps) => {
    return (
        <div className="grid grid-rows-2">
            <div className="flex items-center justify-center px-5 my-5 gap-5">

                <div className=" bg-yellow-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 6 months but not later than 12 months.">{`6 months later.`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                    </div>

                </div>

                <div className=" bg-violet-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 12 months but not later than 18 months." >{`12 months later.`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                    </div>
                </div>

                <div className=" bg-blue-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 18 months but not later than 24 months.">{`18 months later.`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                    </div>
                </div>


            </div>
            <div className="flex items-center justify-center px-5 my-5 gap-5">

                <div className=" bg-red-400  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 6 months but not later than 12 months.">{`6 months later.`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                    </div>

                </div>

                <div className=" bg-green-300  h-72 rounded-lg hover:shadow-md">
                    <label className="flex items-center justify-center font-semibold bg-gray-600 text-white rounded h-10" title="After 12 months but not later than 18 months." >{`12 months later.`}</label>
                    <div className="grid grid-rows-4 gap-5 py-8 px-5">
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Rate :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Principal :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center ">
                            <label className="w-20" htmlFor="">
                                Return :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <label className="w-20" htmlFor="">
                                Total :
                            </label>
                            <input
                                type="text"
                                className="form-input form-input-sm w-44 ml-2"
                            />
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}