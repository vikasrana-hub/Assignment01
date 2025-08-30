import axios from "axios";
import { motion } from "framer-motion";
import { Camera, DollarSign, Eye, Filter, Home, MapPin, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PropertyDashboard() {
    const [selected, setSelected] = useState();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [location, setLocation] = useState();
    const [image, setImage] = useState();
    const [filterType, setFilterType] = useState("");

    // Fetch properties from backend
    useEffect(() => {
        async function renderProperties() {
            try {
                const res = await axios.get('https://assignment01-gilt.vercel.app/api/properties/render');
                const propertiesData = res.data || [];
                setProperties(propertiesData);
                console.log(propertiesData);
                setFilteredProperties(propertiesData); // Initialize filtered properties
            } catch (error) {
                console.log(error);
                setProperties([]);
                setFilteredProperties([]);
            }
        }
        renderProperties();
    }, []);

    useEffect(() => {
        if (filterType === "" || filterType === "All Properties") {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(prop => prop.type === filterType);
            setFilteredProperties(filtered);
        }
    }, [filterType, properties]);

    const formSubmitted = async (e) => {
        e.preventDefault();
        

        try {
            const res = await axios.post('https://assignment01-gilt.vercel.app/api/properties', {
                title: title,
                type,
                location,
                price,
                description,
                URL:image,
            });

            const updatedRes = await axios.get('https://assignment01-gilt.vercel.app/api/properties/render');
            const propertiesData = updatedRes.data || [];
            setProperties(propertiesData);
            setFilteredProperties(propertiesData);

            
            setTitle("");
            setDescription("");
            setPrice("");
            setType("");
            setLocation("");
            setImage("");

        } catch (error) {
            console.log(error);
            alert("Error adding property. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            {/* Dashboard Header */}
            <motion.div
                className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <Home className="w-8 h-8 text-purple-400" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                        Property Listing Dashboard
                    </h1>
                </div>
                <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl shadow-xl hover:shadow-purple-500/25 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add Property
                </motion.button>
            </motion.div>

            {/* Filter Section */}
            <motion.div
                className="mb-8 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-purple-400" />
                    <select
                        className="p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="" className="bg-slate-800">All Properties</option>
                        <option value="Plot" className="bg-slate-800">Plot</option>
                        <option value="Apartment" className="bg-slate-800">Apartment</option>
                        <option value="Retail Store" className="bg-slate-800">Retail Store</option>
                    </select>
                    <span className="text-white/70 text-sm">
                        {filteredProperties.length} properties found
                    </span>
                </div>
            </motion.div>

            
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-10 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {filteredProperties.map((prop, index) => (
                    <motion.div
                        key={prop.id}
                        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden cursor-pointer group hover:bg-white/20 transition-all duration-300"
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        onClick={() => setSelected(prop)}
                    >
                    
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={prop.URL || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"}
                                alt={prop.name || prop.tittle}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                                {prop.type}
                            </div>
                        </div>

                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {prop.name || prop.tittle}
                            </h2>
                            <div className="flex items-center gap-1 text-gray-300 mb-2">
                                <MapPin className="w-4 h-4" />
                                <p className="text-sm">{prop.location}</p>
                            </div>
                            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{prop.desc || prop.description}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1 text-green-400 font-bold">
                                    <DollarSign className="w-4 h-4" />
                                    {prop.price}
                                </div>
                                <motion.button
                                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-1 text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Eye className="w-3 h-3" />
                                    View
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="flex flex-col sm:flex-row gap-8 justify-between items-start px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Plus className="w-6 h-6 text-purple-400" />
                        Add New Property
                    </h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={title || ""}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Property Name"
                                className="p-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            />
                            <select
                                className="p-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                value={type || ""}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="" className="bg-slate-800">Select Type</option>
                                <option value="Plot" className="bg-slate-800">Plot</option>
                                <option value="Apartment" className="bg-slate-800">Apartment</option>
                                <option value="Retail Store" className="bg-slate-800">Retail Store</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="number"
                                value={price || ""}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price (USD)"
                                className="p-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            />
                            <input
                                type="text"
                                value={location || ""}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                className="p-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="url"
                                value={image || ""}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Image URL"
                                className="w-full p-3 pl-10 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            />
                            <Camera className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <textarea
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Property Description"
                            rows="4"
                            className="w-full p-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                        />

                        <motion.button
                            className="w-full py-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={formSubmitted}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Add Property
                        </motion.button>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                    <h2 className="text-2xl font-bold mb-6 text-white text-center">Live Preview</h2>
                    <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        {/* Preview Image */}
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {type && (
                                <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                                    {type}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {title || "Property Title"}
                            </h2>
                            <div className="flex items-center gap-1 text-gray-300 mb-2">
                                <MapPin className="w-4 h-4" />
                                <p className="text-sm">{location || "Property Location"}</p>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">
                                {description || "Property description will appear here..."}
                            </p>
                            <div className="flex items-center gap-1 text-green-400 font-bold">
                                <DollarSign className="w-4 h-4" />
                                {price ? `$${price}` : "$0"}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            
            {selected && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelected(null)}
                >
                    <motion.div
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl max-w-md w-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">{selected.name || selected.tittle}</h2>
                            <button
                                onClick={() => setSelected(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-4 rounded-xl overflow-hidden">
                            <img
                                src={selected.URL || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"}
                                alt={selected.name || selected.tittle}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500";
                                }}
                            />
                        </div>

                        <div className="space-y-3 text-white">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span className="text-gray-300">{selected.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Home className="w-4 h-4 text-purple-400" />
                                <span className="text-gray-300">{selected.type}</span>
                            </div>
                            <p className="text-gray-300">{selected.desc || selected.description}</p>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                <span className="font-bold text-green-400 text-xl">{selected.price}</span>
                            </div>
                        </div>

                        <motion.button
                            className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                            onClick={() => setSelected(null)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
