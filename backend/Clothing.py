from settings import app
from flask_sqlalchemy import SQLAlchemy

# Datenbank initialisieren
db = SQLAlchemy(app)

class Clothing(db.Model):
    __tablename__ = 'clothing'
    id = db.Column(db.Integer, primary_key=True)  # primary key; ID erstellen
    category = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    color = db.Column(db.String(80), nullable=False)
    isTrouserLong = db.Column(db.Boolean(), nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    imgUrl = db.Column(db.String(80), nullable=True)
    compatibleWith = db.Column(db.String(80), nullable=True)
    notCompatibleWith = db.Column(db.String(80), nullable=True)

    def json(self):
        if not self.compatibleWith:
            compatibleWith = []
        else:
            compatibleWith = [int(i) for i in self.compatibleWith.split()]

        if not self.notCompatibleWith:
            notCompatibleWith = []
        else:
            notCompatibleWith = [int(i) for i in self.notCompatibleWith.split()]

        return {'id': self.id, 'category': self.category, 'name': self.name,
                'color': self.color, 'rating': self.rating,
                'imgUrl': self.imgUrl, 'compatibleWith': compatibleWith,
                'notCompatibleWith': notCompatibleWith}

    def add_clothing(_category, _name, _color, _rating, _imgUrl, _isTrouserLong):
        new_clothing = Clothing(category=_category, name=_name, color=_color, rating=_rating, imgUrl=_imgUrl, isTrouserLong=_isTrouserLong, compatibleWith='', notCompatibleWith='')
        db.session.add(new_clothing)
        db.session.commit()  # Änderungen in die Datenbank commiten

    def get_all_clothing_items():
        return [Clothing.json(clothing) for clothing in Clothing.query.all()]

    def get_all_clothing_ids():
        return [clothing.id for clothing in Clothing.query.all()]

    def get_clothing(_id):
        return [Clothing.json(Clothing.query.filter_by(id=_id).first())]

    def get_clothing_of_category(category):
        res = []
        for clothing in Clothing.query.all():
            if clothing.category == category:
                res.append(clothing.id)
        return res
    
    def update_clothing(_id, _category, _name, _color, _rating, _imgUrl):
        clothing_item_to_update = Clothing.query.filter_by(id=_id).first()
        clothing_item_to_update.category = _category
        clothing_item_to_update.name = _name
        clothing_item_to_update.color = _color
        clothing_item_to_update.rating = _rating
        clothing_item_to_update.imgUrl = _imgUrl
        db.session.commit()
    
    def update_compatibility(id_1, id_2, areCompatible):
        clothing_item = Clothing.query.filter_by(id=id_1).first()
        compatible = set(clothing_item.compatibleWith.split(' '))
        notCompatible = set(clothing_item.notCompatibleWith.split(' '))
        if areCompatible:
            compatible.add(str(id_2))
            notCompatible.discard(str(id_2))
        elif areCompatible == None:
            compatible.discard(str(id_1))
            compatible.discard(str(id_2))
            notCompatible.discard(str(id_1))
            notCompatible.discard(str(id_2))
        else:
            compatible.discard(str(id_2))
            notCompatible.add(str(id_2))
        
        clothing_item.compatibleWith = ' '.join([str(i) for i in compatible])
        clothing_item.notCompatibleWith = ' '.join([str(i) for i in notCompatible])
        db.session.commit()


    def delete_clothing(_id):
        Clothing.query.filter_by(id=_id).delete()
        db.session.commit()
