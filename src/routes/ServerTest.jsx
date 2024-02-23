import { useMutation } from "react-query"
import { serverTest } from "../js/api";
import { useForm } from "react-hook-form";

export default function ServerTest() {
    const { register, handleSubmit } = useForm();
    const { mutate } = useMutation(serverTest);
    const onSubmit = (formData) => {
        mutate(formData);
    }
    return (
        <section className="w-full flex justify-center py-16">
            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-7xl flex flex-col space-y-4">
                <input {...register("title")}
                    className="py-1 px-2 border" type="text" placeholder="title" />
                <input {...register("writer")}
                    className="py-1 px-2 border" type="text" placeholder="writer" />
                <textarea {...register("description")}
                    className="py-1 px-2 border" type="text" placeholder="description" rows="10"></textarea>
                <button type="submit" className="py-1 bg-teal-800 text-white">글쓰기</button>
            </form>
        </section>
    );
}