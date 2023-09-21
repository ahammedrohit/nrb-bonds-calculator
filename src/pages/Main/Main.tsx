import { DisplayTiles } from "@/components/DisplayTiles/DisplayTiles";
import { isPositiveInteger, toPositiveInteger } from "@/helpers/isPositiveInteger";
import NavLayout from "@/layouts/NavLayout";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";

interface MainProps { }

export const Main = ({ ...props }: MainProps) => {

    const [investAmount, setInvestAmount] = useState("");
    const [returns, setReturns] = useState({
        "7": 0,
        "13": 0,
        "19": 0,
        "25": 0,
        "61": 0,
    })

    const calculateBondReturns = (amount: number, months: number) => {
        let interestRate = 0;
        if (amount <= 1500000) {
            if (months > 6 && months <= 12) {
                interestRate = 8.70;
            } else if (months >= 12 && months <= 18) {
                interestRate = 9.45;
            } else if (months >= 18 && months <= 24) {
                interestRate = 10.20;
            } else if (months >= 24 && months <= 60) {
                interestRate = 11.20;
            } else if (months > 60) {
                interestRate = 12;
            }

        } else if (amount > 1500000 && amount <= 3000000) {
            if (months > 6 && months <= 12) {
                interestRate = 7.98;
            } else if (months >= 12 && months <= 18) {
                interestRate = 8.66;
            } else if (months >= 18 && months <= 24) {
                interestRate = 9.35;
            } else if (months >= 24 && months <= 60) {
                interestRate = 10.27;
            } else if (months > 60) {
                interestRate = 11;
            }
        } else if (amount > 3000000 && amount <= 5000000) {
            if (months > 6 && months <= 12) {
                interestRate = 7.25;
            } else if (months >= 12 && months <= 18) {
                interestRate = 7.88;
            } else if (months >= 18 && months <= 24) {
                interestRate = 8.50;
            } else if (months >= 24 && months <= 60) {
                interestRate = 9.33;
            } else if (months > 60) {
                interestRate = 10;
            }
        } else if (amount > 5000000) {
            if (months > 6 && months <= 12) {
                interestRate = 6.53;
            } else if (months >= 12 && months <= 18) {
                interestRate = 7.09;
            } else if (months >= 18 && months <= 24) {
                interestRate = 7.65;
            } else if (months >= 24 && months <= 60) {
                interestRate = 8.40;
            } else if (months > 60) {
                interestRate = 9;
            }
        }

        const returns = Math.round(amount * (interestRate / 100));
        return returns;
    }

    const getReturns = (amount : string) => {
        if(isPositiveInteger(amount)){
            setInvestAmount(amount);
            const data = {
                "7": calculateBondReturns(toPositiveInteger(amount), 7),
                "13": calculateBondReturns(toPositiveInteger(amount), 13),
                "19": calculateBondReturns(toPositiveInteger(amount), 19),
                "25": calculateBondReturns(toPositiveInteger(amount), 25),
                "61": calculateBondReturns(toPositiveInteger(amount), 61),
            }
            console.log(data)
            setReturns(data);
        }else{
            setInvestAmount("");
            return;
        }

    }



    return (
        <NavLayout title="Main">
            <div className="py-2 primary-text-color h-full min-h-screen bg-gray-100">

                <div className="mx-36 py-5 bg-white h-full rounded-md shadow-sm">

                    <div className="grid grid-rows-2 items-center justify-center font-semibold gap-3 ">
                        <p className="inline-flex items-center justify-center text-5xl">Bangladesh Diaspora Bond Calculator</p>
                        <p className="inline-flex justify-center text-2xl">Calculate Your US Dollar Investment and Savings Returns</p>
                    </div>
                    <div className="border-b-2 border-gray-300 mx-20 pt-2"></div>

                    <div className="flex justify-center items-center p-5 text-lg mx-20">
                        <div className="grid grid-rows-2 items-center justify-center">
                            <p className="text-red-500 font-semibold">
                                Bangladesh Bank's 5-Year Wage Earner Development Bond Pays Up to 12% Dividend to Expatriate Bangladeshis!
                            </p>
                            <p className="flex items-center justify-center">
                                Use this calculator to calculate your return on investment.
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center justify-center text-sm space-x-5">
                        <div>
                            <label className="font-semibold mb-2 flex items-center justify-center">Invest Amount : </label>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="ml-1 cursor-pointer w-auto btn p-1 rounded-lg"
                                >
                                    <IconCircleMinus />
                                </button>

                                <input
                                    className="form-input form-input-md"
                                    // style={{ width: "10.5rem" }}
                                    id="corporate_code"
                                    type="string"
                                    autoComplete="off"
                                value={investAmount}
                                onChange={(e) => {
                                    getReturns(e.target.value)
                                }}
                                />
                                <button
                                    className="ml-1 cursor-pointer w-auto btn p-1 rounded-lg"
                                >
                                    <IconCirclePlus />
                                </button>
                            </div>
                        </div>
                    </div>

                    <DisplayTiles />


                </div>

            </div>
        </NavLayout>
    )
}