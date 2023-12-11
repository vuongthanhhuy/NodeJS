drop database ProjectNodeJs

create database ProjectNodeJs

use ProjectNodeJs

create table Accounts(
    accountID varchar(250),
    accountFullName varchar(250),
	accountEmail varchar(250),
	accountImage varchar(250),
	accountUsername varchar(250),
	accountPassword varchar(250),
	accountStatus varchar(250),
	accountRole varchar(250),
	firstTime int,
	primary key(accountID)
) CHARACTER SET=utf8mb4;

insert into Accounts values
('001', 'Vương Thanh Huy', 'vuonggthanhhhuyy@gmail.com', 'imgAccount1.png', 'admin', 'admin', 'True', 'admin', 1),
('002', 'Vương Thanh Huy2', 'vuonggthanhhhuyy2@gmail.com', 'imgAccount2.png', 'vuongthanhhuy2', '1234562', 'True', 'staff', 1)

create table Customers(
    customerPhoneNumber varchar(250),
    customerName varchar(250),
	customerAddress varchar(250),
	primary key(customerPhoneNumber)
) CHARACTER SET=utf8mb4;

insert into Customers values
('0854637748', 'Vương Thanh Huy', 'Trà Vinh'),
('0917687929', 'Vương Quốc Hưng', 'Trà Vinh')

create table Products(
    productID varchar(250),
    productName varchar(250),
	productPrice float,
	productRetail float,
	productCategory varchar(250),
	productCreationDate datetime,
	productImage varchar(250),
	primary key(productID)
) CHARACTER SET=utf8mb4;

insert into Products values
('001', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('002', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png'),
('003', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('004', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png'),
('005', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('006', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png'),
('007', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('008', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png'),
('009', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('010', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png'),
('011', 'product 1', 19000000, 18500000, 'Phone', '2023-12-09 12:00:00', 'imgProduct.png'),
('012', 'product 2', 20000000, 19000000, 'Phone', '2023-12-08 12:00:00', 'imgProduct2.png')

create table ProductDetails
(
	productID varchar(250),
	productInfo varchar(250),
	productScreen varchar(250),
	productOS varchar(250),
	productCamera varchar(250),
	productChip varchar(250),
	productRam varchar(250),
	productMemory varchar(250),
	productSim varchar(250),
	productPin varchar(250),
	foreign key (productID) references Products(productID)
) CHARACTER SET=utf8mb4;

insert into ProductDetails values
('001', 'Apple trong sự kiện ngày 8/9 đã giới thiệu đến người dùng Điện thoại iPhone 14 Pro 256GB mẫu mang những cải tiến về mặt thiết kế cũng như cấu hình phần cứng, hứa hẹn một sản phẩm mạnh mẽ đáp ứng mọi nhu cầu của bạn.', 'OLED, 6.1', 'iOS 15', '2 camera 12 MP', 'Apple A14 Bionic', '4 GB', '128 GB', '1 Nano SIM & 1 eSIMHỗ trợ 5G', '2815 mAh, 20 W '),
('002', 'IPhone 14 Pro 256GB mẫu mang những cải tiến về mặt thiết kế cũng như cấu hình phần cứng, hứa hẹn một sản phẩm mạnh mẽ đáp ứng mọi nhu cầu của bạn.', 'OLED, 6.1', 'iOS 15', '2 camera 12 MP', 'Apple A14 Bionic', '4 GB', '128 GB', '1 Nano SIM & 1 eSIMHỗ trợ 5G', '2815 mAh, 20 W ')

create table History(
    historyID varchar(250),
    historyDate datetime,
	customerPhoneNumber varchar(250),
	totalPrice float,
	totalReturn float,
	totalPaid float,
	accountID varchar(250),
	primary key(historyID),
	foreign key (customerPhoneNumber) references Customers(customerPhoneNumber),
	foreign key (accountID) references Accounts(accountID)
) CHARACTER SET=utf8mb4;

insert into History value
('001', '2023-12-08 12:00:00', '0854637748', 39000000, 1000000, 40000000, '001'),
('002', '2023-12-08 12:00:00', '0854637748', 19000000, 1000000, 20000000, '001'),
('003', '2023-12-08 12:00:00', '0917687929', 39000000, 1000000, 40000000, '002'),
('004', '2023-12-08 12:00:00', '0917687929', 19000000, 1000000, 20000000, '002')

create table HistoryDetails(
    quantity int,
    totalPriceOfProduct float,
	productPrice float,
	historyID varchar(250),
	productID varchar(250),
	foreign key (historyID) references History(historyID),
	foreign key (productID) references Products(productID),
    primary key(historyID, productID)
) CHARACTER SET=utf8mb4;

insert into HistoryDetails values
(1, 19000000, 19000000, '001', '001'),
(1, 20000000, 20000000, '001', '002'),
(1, 19000000, 19000000, '002', '001'),
(1, 19000000, 19000000, '003', '001'),
(1, 20000000, 20000000, '003', '002'),
(1, 19000000, 19000000, '004', '001')

create table Carts(
    quantity int,
	customerPhoneNumber varchar(250),
	accountID varchar(250),
	productID varchar(250),
	foreign key (accountID) references Accounts(accountID),
	foreign key (productID) references Products(productID),
	foreign key (customerPhoneNumber) references Customers(customerPhoneNumber),
    primary key(customerPhoneNumber, accountID, productID)
) CHARACTER SET=utf8mb4;
