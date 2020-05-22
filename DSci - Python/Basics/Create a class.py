# Create the Garbage class
class Garbage(Base):
  __tablename__ = "garbage_collection"
  id = Column(Integer, primary_key=True)
  item = Column(String)
  weight = Column(Integer)
  collector = Column(String)
