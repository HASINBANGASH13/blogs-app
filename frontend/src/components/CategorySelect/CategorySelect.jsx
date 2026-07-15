function CategorySelect({
    categories = [],
    value,
    onChange,
    name = "category",
    required = false,
    loading = false
}) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
        >
            <option value="">
                {loading
                    ? "Loading Categories..."
                    : "Select Category"}
            </option>

            {categories.map((category) => (
                <option
                    key={category._id}
                    value={category._id}
                >
                    {category.name}
                </option>
            ))}
        </select>
    );
}

export default CategorySelect;