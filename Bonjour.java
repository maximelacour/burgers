import  javafx.application.*;
import  javafx.scene.*;
import  javafx.stage.*;
import  javafx.scene.layout.*;
import  javafx.scene.control.*;

public class Bonjour extends Application
{
public static void main(String [] Arguments)
  {
  launch(Arguments);
  }

public void start (Stage Plateau)
  {
  Plateau.setTitle("Bonjour");
  FlowPane Agencement=new FlowPane();
  Label Message=new Label("Bonjour le Monde");
  Agencement.getChildren().add(Message);
  Scene Scene_Principale=new Scene(Agencement, 300, 100);
  Plateau.setScene(Scene_Principale);
  Plateau.show();
  }
}
