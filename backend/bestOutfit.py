import random
from Clothing import Clothing

def getBestOutfit():
    res = []
    allClothes = Clothing.query.all()

    # ayoo, hier musst du deinen Algorithmus einfügen
    # - allClothes ist die Liste aller Kleidungsstücke
    # - jedes Kleidungsstück hat folgende Paramter:
    # 	- kleidungsstück.id - ID des Kleidungsstücks
    #	- kleidungsstück.category - Kategorie des Kleidungsstücks ('trousers', 'tshirt', 'jacket', 'pullover')
    # 	- kleidungsstück.name - Der in der GUI gegebene Name
    # 	- kleidungsstück.color - Die in der GUI eingegebene Farbe (wozu braucht man die überhaupt? xD)
    # 	- kleidungsstück.isTrouserLong - Falls Kleidungsstück Hose ist: wahr, wenn es sich um eine lange Hose handelt, sonst falsch
    # 	- kleidungsstück.rating - Das gegebene Rating auf einer Skala von 1 - 10
    #	- kleidungsstück.imgUrl - Url, zum Bild
    # 	- kleidungsstück.compatibleWith - Liste mit Kleidungsstück-IDs aller Kleidungstücke, die mit dem aktuellen Kleidungsstück zusammen passen
    # 	- kleidungsstück.notCompatibleWith - genau wie kleidungsstück.compatibleWith, nur dass die nicht kompatiblen Items gespeichert werden

    # noch eine Idee für das beste Outfit:
    # 	- schreibe eine Funktion score(outfit), die für eine Outfit berechnet, wie gut das ist
    # 	- teste alle möglichen Kombinationen von Hosen, Tshirts, Jacken und Pullover durch und gib das Outfit mit dem höchsten Score zurück



    



    # Rückgabe der Funktion: Liste der Ids vom besten Outfit
    # z.B: [315, 344, 234, 245]
    # die Länge ist egal, ein Outfit könnte also zum Beispiel auch aus 3 Kleidungsstücken bestehen (ohne Jacke)
    # Der Code hier unten wählt einfach 4 random Kleidungsstücke für das Outfit aus
    for _ in range(4):
        randIndex = random.randint(0, len(allClothes) - 1)
        res.append(allClothes.pop(randIndex).id)
    return res

def Kleidungsstück(l,k):
#Alle möglichen kleidungsstücke des richtigen Typs(T-Shirt,Hose,...) und mit richtiger Eigenschaf(Länge,Jackenart) werden ausgewählt
    if k==0:
        lK=[0,1]  #Alle T-Shirts
        wK=[4,2]  #wertigkeit der T-Shirts
    elif k==1:
        lK=[0,1] #Alle kurze Hosen
        wK=[4,3] #wertigkeit der Hosen
    elif k==2:
        lK=[0,1] #Alle Pullis
        wK=[3,1] #wertigkeit der pullis
    else:
        lK=[0] #Alle Softshelljacken
        wK=[3] #wertigkeit der jacken

    #kompatibilitt der einzelenen klamooten geordnet nach KleidungTyp1 kleidungsstück1 kleidungTyp2 kleidungsstück2
    wertigkeit=[[[[],[4,1],[2,3],[4]] , [[],[3,2],[4,2],[2]]]   ,   [[[],[],[2,3],[3]] , [[],[],[4,2],[3]]]   ,    [[[],[],[],[3]] , [[],[],[],[1]]]]
                  
    for i in range(4):
        if i==k: #kleidungen des gleichen typs sind nicht kompatibel
            continue
        elif type(l[i])==int: #nur wenn bereits ein kleidungsstück dieses Kleidungstypen ausgewählt wurde, kann es ein kompatibilitäts rating geben
            for j in range(len(wK)):
                if k>i:
                    w=wertigkeit[i][l[i]][k][j]
                else:
                    w=wertigkeit[k][j][i][l[i]]
                wK[j]*=w
    
    z=random.randint(0,sum(wK)-1)
    for I in range(len(wK)):
        if z<wK[I]:
            return lK[I]
        else:
            z-=wK[I]
    
h=True #Hose ist kurz
p=True #Pulli im Outfit
j=[True,3] #Softshelljacke im Outfit
t=""
k=3
#k: 0-T-Shirt, 1-Hose, 2-Pulli, 3-Jacke
j=Kleidungsstück([t,h,p,j],k)
print(j)
k=2
p=Kleidungsstück([t,h,p,j],k)
print(p)
k=1
h=Kleidungsstück([t,h,p,j],k)
print(h)
k=0
t=Kleidungsstück([t,h,p,j],k)
print(t)