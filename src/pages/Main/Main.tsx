import { DisplayTiles } from "@/components/DisplayTiles/DisplayTiles";
import { isPositiveInteger, toPositiveInteger } from "@/helpers/isPositiveInteger";
import { ReturnProps } from "@/interfaces/DisplayTiles";
import NavLayout from "@/layouts/NavLayout";
import { useState } from "react";
import { CircleMinus, CirclePlus } from 'tabler-icons-react';

interface MainProps { }

const predefinedAmounts = [25000, 50000, 100000, 200000, 500000, 1000000, 5000000];

export const Main = ({ ...props }: MainProps) => {

    const [investAmount, setInvestAmount] = useState("");

    const [returns, setReturns] = useState<ReturnProps | undefined>()
    const [buttonClickCounts, setButtonClickCounts] = useState(Array(predefinedAmounts.length).fill(0));

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

    const getReturns = (amount: string) => {
        if (isPositiveInteger(amount)) {
            setInvestAmount(amount);
            const data: ReturnProps = {
                six: calculateBondReturns(toPositiveInteger(amount), 7),
                twelve: calculateBondReturns(toPositiveInteger(amount), 13),
                eighteen: calculateBondReturns(toPositiveInteger(amount), 19),
                twentyfour: calculateBondReturns(toPositiveInteger(amount), 25),
                matured: calculateBondReturns(toPositiveInteger(amount), 61),
            }
            setReturns(data);
        } else {
            setInvestAmount("");
            return;
        }
    }

    const handleAmountChange = (amount: number, index: number, indexCount?: string) => {
        const sum = Number(investAmount) + amount;

        if (indexCount !== 'minus' || buttonClickCounts[index] > 0) {
            getReturns(String(sum));
        }
        const updatedButtonClickCounts = buttonClickCounts.map((count, i) => {
            if (i === index) {
                if (indexCount === 'plus') {
                    return count + 1;
                } else if (indexCount === 'minus') {
                    return count - 1 >= 0 ? count - 1 : 0;
                }
            }
            return count;
        });
        setButtonClickCounts(updatedButtonClickCounts);
    };



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
                                Bangladesh Bank's 5-Year Wage Earner Development Bond Pays Up to 12% Dividend to Expatriate Bangladeshis!!!
                            </p>
                            <p className="flex items-center justify-center">
                                Use this calculator to calculate your return on investment.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center text-sm space-x-5 mb-5">
                        {predefinedAmounts.map((amount, index) => (
                            <div key={index} aria-label={`Amount ${new Intl.NumberFormat().format(amount)}`}>
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-sm opacity-75"
                                        onClick={() => handleAmountChange(amount, index, "plus")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <CirclePlus />
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-md w-28"
                                        onClick={() => handleAmountChange(amount, index, "plus")}
                                    >
                                        {new Intl.NumberFormat().format(amount)}
                                        <sup>{buttonClickCounts[index] ? `+ ${buttonClickCounts[index]}` : ''}</sup>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-sm opacity-75"
                                        onClick={() => handleAmountChange(-amount, index, "minus")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <CircleMinus />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className="flex items-center justify-center text-sm space-x-5">
                        <div>
                            <label className="font-semibold mb-2 flex items-center justify-center">{`Invest Amount : `}</label>
                            <div className="flex items-center space-x-2">

                                <input
                                    className="form-input form-input-md"
                                    id="corporate_code"
                                    type="string"
                                    autoComplete="off"
                                    value={investAmount}
                                />
                            </div>
                        </div>
                    </div>

                    <DisplayTiles
                        returns={returns}
                        investAmount={investAmount}
                    />

                </div>
            </div>
        </NavLayout>
    )
}