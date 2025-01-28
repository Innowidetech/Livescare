import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './layout/AdminHeader';
import { XIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { addItem, fetchItems, updateItem, deleteItem, clearError } from '../../redux/inventorySlice';
import { toast } from 'react-toastify';

const ITEM_TYPES = ['Food', 'Clothes', 'Books', 'Medical', 'Toys', 'Games Kit', 'Money', 'Others'];
const STATUS_TYPES = ['Available', 'Out Of Stock'];

function AdminInventory() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.inventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          ? { amount: parseFloat(formData.amount) }
          : { count: parseInt(formData.count) }
        )
      };

      if (editingItem) {
        await dispatch(updateItem({ itemId: editingItem._id, itemData })).unwrap();
        toast.success('Item Updated Successfully');
      } else {
        await dispatch(addItem(itemData)).unwrap();
        toast.success('Item Added Successfully');
      }

      closeModal();
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
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dispatch(deleteItem(itemId)).unwrap();
        toast.success('Item Deleted Successfully');
        dispatch(fetchItems());
      } catch (err) {
        toast.error(err.message || 'Failed to delete item');
        console.error('Failed to delete item:', err);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', count: '', amount: '', status: 'Available' });
    dispatch(clearError());
  };

  return (
    <>
      <div>
        {/* <Header /> */}
      </div>
      <div className="md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium" style={{ fontFamily: 'Inter' }}>Inventory</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FCA311] text-white px-4 py-2 rounded-md hover:bg-[#e59310] transition-colors"
          >
            Add Item
          </button>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Items Details</h2>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="">
                    <tr className='bg-[#F1F4F9] rounded-xl'>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Item Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Count</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>Amount</th>
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
                        <td className="px-6 py-4">
                          {item.name === 'count'
                            ? (item.count ? `$${item.count}` : '--')
                            : (item.count ? item.count : '--')}
                        </td>
                        <td className="px-6 py-4">
                          {item.name === 'Money'
                            ? (item.amount ? `$${item.amount.toFixed(2)}` : '--')
                            : (item.amount ? item.amount : '--')}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${item.status === 'Available'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                              }`}
                          >
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
                            <hr className="w-[1px] h-4 bg-[#FCA311] border-none" />
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-gray-600 hover:text-red-600 transition-colors"
                              title="Delete item"
                            >
                              <TrashIcon className="h-4 w-4" />
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingItem ? 'Edit Item' : 'Add Item'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
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
                        <option key={type} value={type}>
                          {type}
                        </option>
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
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FCA311] text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e59310] transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {editingItem ? 'Updating...' : 'Adding...'}
                      </span>
                    ) : (
                      editingItem ? 'Update Item' : 'Add Item'
                    )}
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