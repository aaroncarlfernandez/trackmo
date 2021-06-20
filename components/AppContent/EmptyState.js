import Image from 'next/image'
import { useState, useEffect, useContext } from "react"
import UserContext from '../../UserContext'
const EmptyState = ({imageFile, mainText}) => {
    const { categories } = useContext(UserContext)
    const [whatToCreate, setWhatToCreate] = useState("");

    useEffect(() => {
        if (categories.length<=0) {
            setWhatToCreate("new category")

        } else {
            setWhatToCreate("new transaction")
        }
    }, [categories])

    return (
        <div className="contentCard contentCard--empty-state">
            <button className="btn btn-link" type="button">
                <Image
                    id={'empty_expense'}
                    src={imageFile}
                    alt="Empty Transaction"
                    width={140}
                    height={140}
                />
            </button>
            <h2>{mainText}</h2>
            <p>Start by creating a {whatToCreate} using the <span className="bold">Create</span> button.</p>
        </div>

    );
}

export default EmptyState;