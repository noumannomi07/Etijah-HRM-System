import female from "@assets/images/homeimages/users/female.png";
const HeaderEvaluatives = ({ employee }) => {
    return (
        <div className="info-user item-center-flex mb-5">
            <div className="image-user">
                <img
                    src={employee?.image || female}
                    alt="image user"
                    className="w-[45px] h-[45px] rounded-full"
                />
            </div>
            <h2 className="name-user">{employee?.name}</h2>
        </div>
    );
};

export default HeaderEvaluatives;
