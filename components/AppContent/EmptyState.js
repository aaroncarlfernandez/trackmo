import Image from 'next/image'
const EmptyState = () => {

    return (
        <div className="contentCard contentCard--empty-state">
            <button className="btn btn-link" type="button">
                <Image
                    id={'empty_expense'}
                    src="/empty-expenses.svg"
                    alt="Empty Transaction"
                    width={140}
                    height={140}
                />
            </button>
            <h2>You have no transaction</h2>
            <p>Create a new transaction or category by clicking New.</p>
        </div>

    );
}

export default EmptyState;