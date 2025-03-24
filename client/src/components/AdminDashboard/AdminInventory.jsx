import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './layout/AdminHeader';
import { getProfile} from "../../redux/adminprofile";
import { XIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { addItem, fetchItems, updateItem, deleteItem, clearError } from '../../redux/inventorySlice';
import { toast } from 'react-toastify';

const ITEM_TYPES = ['Food', 'Clothes', 'Books', 'Medical', 'Toys', 'Games Kit', 'Money', 'Others'];
const STATUS_TYPES = ['Available', 'Out Of Stock'];

function AdminInventory() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.inventory);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    count: '',
    amount: '',
    status: 'Available'
  });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  
  const { profile } = useSelector((state) => state.adminProfile);
  
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        name: formData.name,
        status: formData.status,
        ...(formData.name === 'Money'
          ? { amount: Number(formData.amount) }
          : { count: parseInt(formData.count) }
        )
      };

      await dispatch(addItem(itemData)).unwrap();
      toast.success('Item Added Successfully');
      closeAddModal();
      dispatch(fetchItems());
    } catch (err) {
      toast.error(err.message || 'An error occurred');
      console.error('Failed to save item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.itemName,
      count: item.count || '',
      amount: item.amount || '',
      status: item.status
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        status: formData.status,
        ...(editingItem.itemName === 'Money'
          ? { amount: Number(formData.amount) }
          : { count: parseInt(formData.count) }
        )
      };

      await dispatch(updateItem({ itemId: editingItem._id, itemData })).unwrap();
      toast.success('Item Updated Successfully');
      closeEditModal();
      dispatch(fetchItems());
    } catch (err) {
      toast.error(err.message || 'Failed to update item');
      console.error('Failed to update item:', err);
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({ name: '', count: '', amount: '', status: 'Available' });
    dispatch(clearError());
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', count: '', amount: '', status: 'Available' });
    dispatch(clearError());
  };

  return (
    <>
      <div className="md:p-6 md:mt-10 mt-12">
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h2 className="text-3xl sm:text-2xl md:text-3xl mb-2 font-medium text-left" style={{ fontFamily: 'Inter' }}>
            Hi, <span className="">{profile?.loggedinuser?.fullname}</span>
          </h2>

          <h1 className="text-xl sm:text-xl md:text-3xl font-medium text-left sm:text-center md:text-left" style={{ fontFamily: 'Inter' }}>
            Inventory
          </h1>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FCA311] text-white px-4 py-2 rounded-md hover:bg-[#e59310] transition-colors mt-4 md:mt-0"
          >
            <h1 className="md:text-lg sm:text-base text-sm">Add Item</h1>
          </button>
        </div>

        {/* Items Table */}
        <div className="lg:bg-white rounded-lg lg:shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-4 text-[#202224]" style={{ fontFamily: 'Inter' }}>Items Details</h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCA311]"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-4 bg-red-50 rounded-md">
                {error}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items found. Add some items to get started.
              </div>
            ) : (
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className='bg-[#F1F4F9] rounded-xl'>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Item Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Count/Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item._id} className="cursor-pointer text-[#202224]">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="ml-2">{item.itemName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 lg:px-14">
                          {item.itemName === 'Money'
                            ? item.amount ? `$${Number(item.amount).toFixed(2)}` : '--'
                            : item.count || '--'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                              title="Edit item"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-[#FCFDFD] rounded-xl p-4 space-y-4">
              <div className="space-y-2">
                <div className="grid">
                  <div className="flex items-center justify-between" style={{ fontFamily: 'Inter' }}>
                    <h1 className="text-left font-medium text-[#202224] text-sm">Item Name</h1>
                    <h1 className="py-4 text-[#202224]">{item.itemName}</h1>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-left font-medium text-[#202224] text-sm">
                      {item.itemName === 'Money' ? 'Amount' : 'Count'}
                    </h1>
                    <h1 className="py-4 text-[#202224]">
                      {item.itemName === 'Money'
                        ? item.amount ? `$${Number(item.amount).toFixed(2)}` : '--'
                        : item.count || '--'}
                    </h1>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-left font-medium text-[#202224] text-sm">Status</h1>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h1 className="text-left font-medium text-[#202224] text-sm">Actions</h1>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit item"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Item</h3>
                <button onClick={closeAddModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <select
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="">Select Item Type</option>
                      {ITEM_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {formData.name === 'Money' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Count</label>
                      <input
                        type="number"
                        name="count"
                        value={formData.count}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      {STATUS_TYPES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm p-2 bg-red-50 rounded">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FCA311] text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e59310] transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding...
                      </span>
                    ) : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Item</h3>
                <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                      type="text"
                      value={editingItem.itemName}
                      disabled
                      className="mt-1 block w-full p-3 rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {editingItem.itemName === 'Money' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Count</label>
                      <input
                        type="number"
                        name="count"
                        value={formData.count}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      {STATUS_TYPES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm p-2 bg-red-50 rounded">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FCA311] text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e59310] transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Updating...
                      </span>
                    ) : 'Update Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminInventory;