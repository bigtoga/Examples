Useful when you have a need for factory-like objects that vary slightly
- Abstract the “things that every final product must use or have” into higher level interface/class
- Build the lowest level “thing” using inheritance 

# Roles in Builder
- **Product** - an object instance of a Concrete Builder class; i.e. the result of “work performed” 
- **Builder** - The abstract class that defines the minimum requirements that each Concrete Builder must implement to build a Product
- **Concrete Builder** - concrete class that inherits from Builder and does final build of the Product
- **Director** - implements (directs) the Concrete Builders to create Product; optional

# Example 

Builder is useful when you have a final outcome that varies slightly amongst a finite group. 

Business Problem: website that sells vehicles of multiple types: cars, scooters, motorcycles 

In this example, Builder works well because:
1. All “things” are of the same arch-type, vehicle
1.  All vehicles have wheels, engines, bodies/frames
1. Slight variance between “things” - scooters and motorcycles have zero doors but cars have 1 or more

```csharp   

# Code from https://www.dofactory.com/net/builder-design-pattern

using System;
using System.Collections.Generic;
 
namespace GangOfFour.Builder
{
   /// The final Product class 
   class Vehicle
  {
    private string _vehicleType;
    private Dictionary<string,string> _parts = 
      new Dictionary<string,string>();
 
    // Constructor
    public Vehicle(string vehicleType)
    {
      this._vehicleType = vehicleType;
    }
 
    // Indexer
    public string this[string key]
    {
      get { return _parts[key]; }
      set { _parts[key] = value; }
    }
 
    public void Show()
    {
      Console.WriteLine(“\n—————————“);
      Console.WriteLine(“Vehicle Type: {0}”, _vehicleType);
      Console.WriteLine(“ Frame : {0}”, _parts[“frame”]);
      Console.WriteLine(“ Engine : {0}”, _parts[“engine”]);
      Console.WriteLine(“ #Wheels: {0}”, _parts[“wheels”]);
      Console.WriteLine(“ #Doors : {0}”, _parts[“doors”]);
    }

  /// Builder
  abstract class VehicleBuilder
  {
    protected Vehicle vehicle;
 
    public Vehicle Vehicle
    {
      get { return vehicle; }
    }
 
    // Abstract build methods
    public abstract void BuildFrame();
    public abstract void BuildEngine();
    public abstract void BuildWheels();
    public abstract void BuildDoors();
  }
  
  /// Concrete Builder # 1: A motorcycle Product
  class MotorCycleBuilder : VehicleBuilder
  {
    public MotorCycleBuilder()
    {
      vehicle = new Vehicle(“MotorCycle”);
    }
 
    public override void BuildFrame()
    {
      vehicle[“frame”] = “MotorCycle Frame”;
    }
 
    public override void BuildEngine()
    {
      vehicle[“engine”] = “500 cc”;
    }
 
    public override void BuildWheels()
    {
      vehicle[“wheels”] = “2”;
    }
 
    public override void BuildDoors()
    {
      vehicle[“doors”] = “0”;
    }
  }
  
  /// Concrete Builder #2: a Car Product
  class CarBuilder : VehicleBuilder
  {
    public CarBuilder()
    {
      vehicle = new Vehicle(“Car”);
    }
 
    public override void BuildFrame()
    {
      vehicle[“frame”] = “Car Frame”;
    }
 
    public override void BuildEngine()
    {
      vehicle[“engine”] = “2500 cc”;
    }
 
    public override void BuildWheels()
    {
      vehicle[“wheels”] = “4”;
    }
 
    public override void BuildDoors()
    {
      vehicle[“doors”] = “4”;
    }
  }
  
  // And finally, Herr Director!
  class Shop
  {
    public void Construct(VehicleBuilder vehicleBuilder)
    {
      vehicleBuilder.BuildFrame();
      vehicleBuilder.BuildEngine();
      vehicleBuilder.BuildWheels();
      vehicleBuilder.BuildDoors();
    }
  }
  
  //////// Using Builder in an app
   public class MainApp {
     public static void Main(){
      
      // Define generic builder object 
      VehicleBuilder builder;
 
      // Director instance
      Shop shop = new Shop();
 
      // Instantiate a specific Concrete Builder - Car
      builder = new CarBuilder();
      shop.Construct(builder);
      builder.Vehicle.Show();
 
      // Now instantiate another Concrete Builder
      builder = new MotorCycleBuilder();
      shop.Construct(builder);
      builder.Vehicle.Show();
     }
  }
}

```



# Additional Resources 
- [Great examples here](https://refactoring.guru/design-patterns/builder)
- [C# examples here](https://www.dofactory.com/net/builder-design-pattern)