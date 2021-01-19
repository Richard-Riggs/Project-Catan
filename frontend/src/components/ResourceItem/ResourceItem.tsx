interface ResourceItemProps {
    name: string,
    count: number
}

export default function ResourceItem({name, count}: ResourceItemProps) {
    return (
        <div>
            <label>{name}: </label>
            <span>{count || 0}</span>
        </div>
    )
}
