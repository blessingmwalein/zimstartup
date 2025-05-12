

const CompetitionSectoin = ({competition}) => {
    return (
        <div>
            <h5>{competition.competition_name}</h5>
            <p>{competition.status}</p>
        </div>
    )
};

export default CompetitionSectoin;