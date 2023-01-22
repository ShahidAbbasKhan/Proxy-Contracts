const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy", function () {
  
  async function deployFixture() {
   
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();
    
    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    const ProxyAsLogic1 = await ethers.getContractAt("Logic1",proxy.address);
    const ProxyAsLogic2 = await ethers.getContractAt("Logic2", proxy.address);
    return { proxy,logic1,logic2,ProxyAsLogic1,ProxyAsLogic2};
  }

  describe("Deployment", function () {
    it("Should work with Logic1", async function () {
      const {proxy,ProxyAsLogic1, logic1} = await loadFixture(deployFixture);
      await proxy.changeImplemention(logic1.address);
      
      assert.equal( await logic1.x(), 0);

      await ProxyAsLogic1.changeValue(66);

      assert.equal( await logic1.x(), 66);
    });

    it("Should work with upgrades", async function () {
      const {logic1,ProxyAsLogic1,ProxyAsLogic2, logic2,proxy} = await loadFixture(deployFixture);
      assert.equal( await logic1.x(), 0);

      await proxy.changeImplemention(logic1.address);
      await ProxyAsLogic1.changeValue(2);
      assert.equal( await logic1.x(), 2);
      
      assert.equal( await logic2.x(), 0);
     
      await proxy.changeImplemention(logic2.address);
      await ProxyAsLogic2.changeValue(2);
      await ProxyAsLogic2.trippleX();



      assert.equal( await logic2.x(),6);
    });


    
  });


    
    

  });

