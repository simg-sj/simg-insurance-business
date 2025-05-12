import React from 'react';
import {FileUploadProps, FileWithPreview} from '@/@types/common'

const FileUpload = ({
                        sectionId,
                        description = "PDF 파일만 제출이 가능합니다",
                        files,
                        setFiles
                    }: FileUploadProps) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
            .filter(file => file.type === 'application/pdf')
            .map(file => Object.assign(file, {
                id: `${sectionId}-${file.name}-${file.lastModified}`,
                sectionId
            })) as FileWithPreview[];

        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const handleDelete = (file: FileWithPreview) => {
        const confirmed = window.confirm(`${file.name}을(를) 삭제하시겠습니까?`);
        if (confirmed) {
            setFiles(files.filter(f => f !== file));
        }
    };

    const formatFileSize = (bytes: number) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)}MB`;
    };

    return (
        <div className="w-full">
            <div className="flex items-center mb-2">
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        multiple
                        className="hidden"
                        id={`file-upload-${sectionId}`}
                    />
                    <label
                        htmlFor={`file-upload-${sectionId}`}
                        className="flex items-center px-2 py-1 bg-white border rounded-md cursor-pointer text-sm hover:bg-gray-50 w-[67px] fileButton"
                    >
                        <span>파일추가</span>
                    </label>
                </div>
                <div className="text-sm text-gray-500 ml-5">
                    {description}
                </div>
            </div>
            <div className="space-y-2">
                {files.map((file, index) => (
                    <div
                        key={`${sectionId}-${index}`}
                        className="flex items-center justify-between p-2 border rounded-md"
                    >
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </span>
                            <button
                                onClick={() => handleDelete(file)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <div> ×</div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;