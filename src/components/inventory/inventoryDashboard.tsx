'use client';
import React from 'react'
import InventoryCard from './inventoryCard'
import { StockCard } from './stockCard'
import InventoryButton from './inventoryButton';

// Example icons — replace these with actual URLs or local imports
const icons = {
  items: '/assets/totalItem.svg',
  vendors: '/assets/vendor.svg',
  warehouse: '/assets/warehouse.svg',
}

const items = [
  {
    name: "Chicken",
    status: "Warning",
    level: "Below reorder level ",
    remaining: '3lbs',
  },
 {
    name: "Pork",
    status: "Warning",
    level: "Below reorder level ",
    remaining: '3lbs',
  },

   {
    name: "fish",
    status: "Warning",
    level: "Below reorder level ",
    remaining: '3lbs',
  },
];


const InventoryDashboard = () => {
  return (
    <div className='m-4'>

  <div className="flex justify-between mt-2 items-end mb-8">
  <h2 className="font-semibold text-[24px] m-0">
    Inventory Summary
  </h2>
  <div className="flex gap-2">
    <InventoryButton title="View all items" action={() => {}} />
    <InventoryButton title="View all Transaction" action={() => {}} />
    <InventoryButton title="Adjust Stock" action={() => {}} />
  </div>
</div>

    <div className="flex mb-2">
      <InventoryCard
        icon={icons.items}
        title="Total Items"
        count={170}
        stateThisweek="+12 this week"
      />
      <InventoryCard
        icon={icons.vendors}
        title="Vendors"
        count={10}
        stateThisweek="+2 new"
      />
      <InventoryCard
        icon={icons.warehouse}
        title="Warehouses"
        count={5}
        width='70px'
        stateThisweek="+1 this month"
      />
    </div>

    <div>
        <h2 className='my-1 font-semibold text-[24px]'>Stock Alerts (3)</h2>
         <div className="flex flex-col gap-4 ">
    {items.map((item, index) => (
      <StockCard key={index} {...item} />
    ))}
  </div>
    </div>
    </div>
  )
}

export default InventoryDashboard
