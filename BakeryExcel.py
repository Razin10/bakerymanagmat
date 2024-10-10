import pandas as pd
import datetime
#pls 1st open terminal and run this 
######
# pip install openpyxl
# pip install datetime
# pip install pandas 
######
class BakeryOrder:
    def __init__(self, order_id, customer_name, item, quantity, order_date):
        self.order_id = order_id
        self.customer_name = customer_name
        self.item = item
        self.quantity = quantity
        self.order_date = order_date
        self.status = "Pending"

class BakeryManagementSystem:
    def __init__(self):
        self.orders = []
        self.order_id_counter = 1

    def add_order(self, customer_name, item, quantity):
        order_id = self.order_id_counter
        order_date = datetime.date.today()
        new_order = BakeryOrder(order_id, customer_name, item, quantity, order_date)
        self.orders.append(new_order)
        self.order_id_counter += 1
        print(f"Order added successfully. Order ID: {order_id}")

    def view_order_details(self, order_id):
        for order in self.orders:
            if order.order_id == order_id:
                print(f"Order ID: {order.order_id}")
                print(f"Customer Name: {order.customer_name}")
                print(f"Item: {order.item}")
                print(f"Quantity: {order.quantity}")
                print(f"Order Date: {order.order_date}")
                print(f"Status: {order.status}")
                return
        print("Order not found.")

    def update_order(self, order_id, new_quantity=None, new_status=None):
        for order in self.orders:
            if order.order_id == order_id:
                if new_quantity is not None:
                    order.quantity = new_quantity
                if new_status is not None:
                    order.status = new_status
                print("Order updated successfully.")
                return
        print("Order not found.")


    def export_to_excel(self):
      filename = input("Enter the desired filename for the Excel file (including .xlsx): ")
      data = [[order.order_id, order.customer_name, order.item, order.quantity, order.order_date, order.status] for order in self.orders]
      df = pd.DataFrame(data, columns=["Order ID", "Customer Name", "Item", "Quantity", "Order Date", "Status"])
      df.to_excel(filename, index=False)
      print("Orders exported to Excel.")

bakery_system = BakeryManagementSystem()

while True:
    print("\nBakery Management System")
    print("1. Add Order")
    print("2. View Order Details")
    print("3. Update Order")
    print("4. Export Orders to Excel")
    print("5. Exit")

    choice = int(input("Enter your choice: "))

    if choice == 1:
        customer_name = input("Enter customer name: ")
        item = input("Enter item: ")
        quantity = int(input("Enter quantity: "))
        bakery_system.add_order(customer_name, item, quantity)
    elif choice == 2:
        order_id = int(input("Enter order ID: "))
        bakery_system.view_order_details(order_id)
    elif choice == 3:
        order_id = int(input("Enter order ID: "))
        new_quantity = int(input("Enter new quantity (or 0 to keep the same): "))
        new_status = input("Enter new status (or leave blank to keep the same): ")
        bakery_system.update_order(order_id, new_quantity, new_status)
    elif choice == 4:
        bakery_system.export_to_excel()
    elif choice == 5:
        break
    else:
        print("Invalid choice. Please try again.")