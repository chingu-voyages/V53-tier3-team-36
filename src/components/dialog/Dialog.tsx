"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import { useRef, useEffect, useState } from 'react';
import { OpenLibrary } from "app/clients/open-library-client";
type Props = {
    onClose: () => void,
    onAddToRead: () => void,
    onAddToWantToRead: () => void,
    loggedIn: boolean,
}
type AuthorObject = {
    [author: string]: {
        [key: string]: string
    }
};
type BookData = null | {
    authors: Array<AuthorObject>,
    title: string,
    subjects: Array<string>,
    description: string | {[value: string]: string}
}
type AuthorData = null | {
    name: string
}
export default function Dialog({ onClose, onAddToRead, onAddToWantToRead, loggedIn }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')
    const bookId = searchParams.get('search');
    const [bookData, setBookData] = useState<BookData>(null);
    const [authorData, setAuthorData] = useState<AuthorData>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (showDialog === 'y') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog]);
    useEffect(() => {
        setLoading(true);
        const getBookData = async () => {
            const bookData = await OpenLibrary.getBookById(bookId);
            setBookData(bookData);
        }
        if (bookId !== null ) {
            getBookData();
        }
      }, [bookId]);
      useEffect(() => {
        if (bookData?.authors) {
            const getAuthorData = async () => {
                const authorKey = bookData.authors[0].author.key
                const authorData = await OpenLibrary.getAuthorData(authorKey);
                setAuthorData(authorData);
            }
            getAuthorData().catch(console.error)
        }
        setLoading(false);
      }, [bookData])
    const closeDialog = () => {
        dialogRef.current?.close()
        onClose()
        router.back();
    }
    const clickAddToRead = () => {
        onAddToRead()
        closeDialog()
    }
    const clickAddToWantToRead = () => {
        onAddToWantToRead()
        closeDialog()
    }
    const dialog: JSX.Element | null = showDialog === 'y'
    ? (
        <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50">
                <div className="md:w-[500px] max-w-fullbg-gray-200 flex flex-col border">
                    <div className="flex flex-row justify-end pt-2 px-5">
                        <button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border w-8 h-8 font-bold text-black"
                        >X</button>
                    </div>
                    <div className="px-5 pb-6">
                        {loading && <span>Loading...</span>}
                        {bookData !== null && authorData !== null &&
                            <div>
                                <h1 className="text-3xl font-bold">{bookData.title}</h1>
                                <h4 className="text-lg italic pb-3">{authorData.name}</h4>
                                <div className="pb-3">{bookData.subjects?.slice(0, 5).map((subject: string, i: number) => <span key={i}>{subject}{i !== 4 && ","} </span>)}</div>
                                <span>{bookData.description && (typeof bookData.description === 'string' ? bookData.description : bookData.description.value)}</span>
                            </div>
                        }
                        {loggedIn ? <div className="flex flex-row justify-end mt-2">
                            
                            <button
                                onClick={clickAddToRead}
                                className="bg-green-500 py-1 px-2 rounded border-none mr-2"
                            >
                                Add to Read
                            </button>
                            <button
                                onClick={clickAddToWantToRead}
                                className="bg-green-500 py-1 px-2 rounded border-none"
                            >
                                Add to Want To Read
                            </button>
                        </div> : null}
                    </div>
                </div>
            </dialog>
    ): null
    return dialog
}