import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";

import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        // e.target은 input이죠!
        // input이 가진 files 객체를 살펴봅시다.
        console.log(e.target.files);
        // 선택한 파일이 어떻게 저장되어 있나 봅시다.
        console.log(e.target.files[0]);

        // ref로도 확인해봅시다. :)
        console.log(fileInput.current.files[0]);
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        // file의 내장함수이다.readAsDataURL =>파일내용을읽어온다.
        reader.readAsDataURL(file);
        //위의 동작인 읽기가 끝나면 아래를 동작해라 
        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
        }

        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    };

    return (
        <React.Fragment>
            <input
                type="file"
                ref={fileInput}
                onChange={selectFile}
                disabled={uploading}
            />
            <Button _onClick={uploadFB} text="업로드하기"></Button>
        </React.Fragment>
    );
};

export default Upload;
