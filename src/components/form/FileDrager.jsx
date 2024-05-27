import { BiCloudUpload } from "react-icons/bi";
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const FileDrager = ({setImageURl}) => {
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            setImageURl(info.file)

        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },

    };
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <BiCloudUpload style={{ fontSize: 80 }} />
            </p>
            <p>Drag and drop a file here or click</p>
        </Dragger>
    )
};
export default FileDrager;