import { useQuery } from "react-query"
import { serverTest } from "../js/api";

export default function ExpressTest() {
    const { data } = useQuery("expressTest", serverTest);
    console.log(data);
    return (
        <div>serverTest</div>
    )
}