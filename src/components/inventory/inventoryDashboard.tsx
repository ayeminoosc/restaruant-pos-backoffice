'use client';
import React, { useEffect } from 'react'
import InventoryCard from './inventoryCard'
import { StockCard } from './stockCard'
import InventoryButton from './inventoryButton';
import { useInventoryStore } from '@/store/inventory-store';

const icons = {
  items: '/assets/totalItem.svg',
  vendors: '/assets/vendor.svg',
  warehouse: '/assets/warehouse.svg',
}

// const items = [
//   {
//     name: "Chicken",
//     status: "Warning",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },
//  {
//     name: "Pork",
//     status: "Warning",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },

//    {
//     name: "fish",
//     status: "Critical",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },
// ];


const InventoryDashboard = () => {

  const {stockAlerts, summary, fetchInventoryData } = useInventoryStore()

  useEffect(() => {
    fetchInventoryData()
  }, [])


  return (
    <div className='m-4'>

      <div className="flex justify-between mt-2 items-end mb-8">
        <h2 className="font-semibold text-[24px] m-0 text-black">
          Inventory Summary
        </h2>
        <div className="flex gap-4">
          <InventoryButton title="View all items" action={() => { }} className='min-w-[204px]' />
          <InventoryButton title="View all Transaction" action={() => { }} className='min-w-[234px]' />
          <InventoryButton title="Adjust Stock" action={() => { }} className='min-w-[200px]' />
        </div>
      </div>

      <div className="flex mb-4">
        <InventoryCard
          icon={icons.items}
          title="Total Items"
          count={summary?.totalItems ?? 0}
          stateThisweek={summary?.totalItemsChange??""}
        />
        <InventoryCard
          icon={icons.vendors}
          title="Vendors"
          count={summary?.vendors ?? 0}
         stateThisweek={summary?.vendorsChange??""}
        />
        <InventoryCard
          icon={icons.warehouse}
          title="Warehouses"
          count={summary?.warehouses ?? 0}
          width='70px'
          stateThisweek={summary?.warehousesChange??""}
        />
      </div>

      <div>
        <h2 className='mb-4 font-semibold text-[24px]'>Stock Alerts (3)</h2>
        <div className="flex flex-col ">
          {stockAlerts.map((item, index) => (
            <StockCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InventoryDashboard
