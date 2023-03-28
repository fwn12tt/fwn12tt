import React, { useState, useEffect } from "react";
import videoSmile from "../../assets/video/smile.mp4";
import Happy from "../../assets/images/happy1.jpeg";
import { connect, useDispatch } from "react-redux";
import * as codeAction from "../../store/actions/codeActions";
import * as CONSTANTS from "../../core/constants";
import "./style.css";

const Home = ({ codeDefault }) => {
  const [codeConfirm, setCodeConfirm] = useState("");
  const [checkConfirm, setCheckConfirm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeDefault) {
      if (codeDefault === CONSTANTS.CODE_DEFAULT) {
        setCheckConfirm(true);
      }
    }
  }, []);

  const onChangeCodeConfirm = (e) => {
    setCodeConfirm(e.target.value);
  };

  const handleConfirmValue = (e) => {
    e.preventDefault();
    if (CONSTANTS.CODE_DEFAULT === codeConfirm) {
      setCheckConfirm(true);
      dispatch(codeAction.getCodeConfirm(codeConfirm));
    } else {
      setCheckConfirm(false);
      dispatch(codeAction.getCodeConfirm(""));
    }
  };

  return (
    <div className="site-content">
      <div className="container">
        {!checkConfirm && (
          <div className="enter-code">
            <h3>Please enter the verification code</h3>
            <div className="form-enter-code flex-box">
              <input type="text" onChange={(e) => onChangeCodeConfirm(e)} />
              <button onClick={(e) => handleConfirmValue(e)}>submit</button>
            </div>
          </div>
        )}
        {checkConfirm && (
          <div className="top-content">
            <h3 className="heading-home">Những lời dành cho Em Ngố nhớ</h3>
            <div className="top-content-text flex-box">
              <video width="300" height="330" controls>
                <source src={videoSmile} type="video/mp4" />
              </video>
              <p>
                Hello Em ngố, Anh chưa biết viết gì cho Em luôn á. Chắc Anh viết
                một đoạn trên còn đoạn dưới là Em viết nhớ {":)))"}. Anh viết
                cái này là mình biết nhau từ ngày 25/11/2022 - 12/03/2023 cũng
                lẹ phết nhỉ. Hồi đó tò mò lắm, không hiểu sao Anh lại dám nhắn
                cho Em, chứ bình thường không hề nhắn trước cho người lạ mà chưa
                quen ở ngoài luôn á. Mà nhờ vậy mà mới biết được Em ngố đó. Xong
                rồi nói chuyện mà ấn tượng đầu tiên là thấy Em tội mới khổ chứ,
                lúc Em nói không biết Em được đi học đại học không nữa thấy
                thương ghê {"(này là lần thứ 2 nói chuyện rồi á)"}. Xong rồi
                nghĩ tết về chắc mua quà cho Em. Mà đến sinh nhật Em nói chuyện
                lại cơ, nói tặng quà cho Em, Em còn tưởng Anh trêu. Bất ngờ nhất
                là giao thừa Em chúc Anh năm mới luôn á. Rồi nói chuyện thì càng
                thấy Em mạnh mẽ với nghị lực lắm luôn, lần đầu thấy một người mà
                học giỏi, chăm chỉ, thương gia đình, nghị lực đối mặt với nhiều
                chuyện như vậy quên mất còn xinh đẹp cute nữa chứ {"=]]]"}, Anh
                kiểu bớt hoàn hảo tí được khummm. Hên tết thời tiết còn cho được
                một ngày mà đi nhà sách không thôi chắc lâu mới thân được kkkk,{" "}
                {"(có ai đó còn hỏi Anh nhậu không)"}.
              </p>
            </div>
            <p className="single-text">
              Vãi sao Anh nói không biết viết gì mà mới viết có tí dài thế. Rồi
              Anh vào SG xong nói chuyện nhiều, giờ thói quen luôn á. Với cũng
              muốn nói chuyện với Em, để Em không cảm thấy mình không bị lãng
              quên. Nhớ là Em luôn là đặc biệt nhất nhớ, ai nói gì kệ người ta,
              không phải người thân của mình, không phải người mình quan tâm thì
              kệ đi, mà có quan tâm thì lấy lời nói của tụi đó làm động lực nghe
              khummm. Xong hôm Em của Em đi viện, Em về kể những chuyện mà Em
              từng trải qua, từ những chuyện đó, rồi dẫn đến Em bị vậy càng muốn
              quan tâm Em hơn. Bữa lướt chỗ nào Anh thấy có câu này đúng với Em
              lắm luôn "Trái tim Em đáng lẽ phải lớn hơn kích thước mà nó đang
              có" thấy Em đúng thương gia đình, hy sinh tất cả những gì Em có
              thể cho đi được. Để Anh gắng làm cho Em bớt những nỗi sợ kia, Anh
              sợ Em lại bị lúc đi thi ghê, mỗi lần đi thi là mỗi lần lo, tính
              nhắc Em đừng sợ mà có nhắc đến điều đó thì Em lại sợ hơn, xong thi
              toán nó xảy ra mất.{" "}
            </p>
            <div className="bottom-content-text flex-box">
              <img src={Happy} alt="happy" />
              <p>
                Hết chỗ cho Em viết goyyyy{" "}
                {
                  "(à Em còn rất nhiều chỗ luôn á, Anh làm cái này là để cho Em viết nhật ký mờ :v)"
                }
                . Sau này có chuyện gì là nhớ nói Anh nghe khumm. Không nói là
                Anh giận Em luôn á. Không biết Anh có giúp được gì nhiều không
                nhưng ít nhất cũng là người để Em có thể tâm sự nhá. Biêt sao
                Anh để cái video với cái hình kia khummm tại luôn muốn Em vui vẻ
                tươi cười yêu đời vậy ớ, với Em cười xinh nhất nhá, gặp mọi
                người cứ cười đầu tiên là tự nhiên thân thiện ngày à. Nhớ ăn
                uống đầy đủ, cố gắng để thi vào trường mà Em thích nhá, Anh đợi
                Em ở cổng trường để đóa. À viết tới đây mới nhớ, lần đàu gặp Em
                là đi đưa quà cho Em biết Em thích sách vui lắm luôn, tại cũng
                không biết tặng gì cho Em cho hợp lý, xong Em nói Em thích sách
                vui ghê. Ấn tượng là ở ngoài nhỏ con hơn Anh nghĩ, mặt cũng nhỏ
                với trắng nữa chứ, còn đam mê sưu tầm son bất ngờ ghê. Không tin
                được là Anh viết nhiều vậy luôn á, viết xong đọc lại chả mạch
                lạc tí nào thảo nào văn thấp tẹt. Nhưng không sao Anh nói được
                những gì Anh nghĩ cho Em gòi kkkk. Cố lên nhá cô gái, nhớ là sau
                này có thể Em phải ăn rau suốt đời đóa kkkk.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    codeDefault: state.codeReducer.codeConfirm,
  };
};

export default connect(mapStateToProps)(Home);
