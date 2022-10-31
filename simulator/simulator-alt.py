import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains


browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = "http://localhost:3000/"

random_cc = [1234567890123456,1231231231231231,6582134902356478,123456789]
while True:
    browser.get(url)
    time.sleep(1)
    address="432 Wiggly Rd, Mountain View, 94043"
    address_text_field=browser.find_element(By.XPATH, "//input[@placeholder='Enter your address']").send_keys(address)
    time.sleep(1)
    button=browser.find_element(By.CSS_SELECTOR, ".ant-btn-primary").click()
    time.sleep(2)
    restaurant = browser.find_elements(By.CSS_SELECTOR, "div.sc-hHLeRK.giEsIV")
    time.sleep(1)
    random.choice(restaurant).click()
    time.sleep(2)
    
    menu = browser.find_elements(By.ID, "menuItem")
    orderItem = random.sample(menu,3)
    for o in orderItem:
        Hover = ActionChains(browser).move_to_element(o)
        Hover.click().perform()
        time.sleep(1)
    cart = browser.find_element(By.CLASS_NAME, "ant-badge").click()
    time.sleep(2)
    pay = browser.find_element(By.ID, "pay").click()
    time.sleep(2)
    num = ''
    
    cardNum = browser.find_element(By.ID, "cardNumber").send_keys(random.choice(random_cc))
    time.sleep(1)
    cvs = ''
    for i in range(3):
        cvs = cvs + str(random.randint(1,9))
    cardCvc = browser.find_element(By.ID, "csv")
    cardCvc.send_keys(cvs)
    time.sleep(2)
    placeOrder = browser.find_element(By.CSS_SELECTOR, "#root > div > main > div > form > div:nth-child(4) > div > div > div > button").click()
    time.sleep(2)